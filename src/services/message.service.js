import { ApiError, apiRequest } from "./api";

const PAGE_LIMIT = 100;

const normalizeMessage = (message) => {
  const id = message?._id || message?.id;

  if (
    !id ||
    !["user", "assistant"].includes(message?.role) ||
    typeof message?.content !== "string"
  ) {
    throw new ApiError("La respuesta del mensaje no es válida.", 500);
  }

  return {
    ...message,
    id,
  };
};

const sortChronologically = (messages) =>
  [...messages].sort((first, second) => {
    const timeDifference =
      new Date(first.createdAt).getTime() - new Date(second.createdAt).getTime();

    if (Number.isNaN(timeDifference) || timeDifference === 0) {
      return String(first.id).localeCompare(String(second.id));
    }

    return timeDifference;
  });

export const getMessagesByConversation = async (conversationId) => {
  const messages = [];
  let page = 1;
  let totalPages = 1;

  do {
    const response = await apiRequest(
      `/messages/conversation/${encodeURIComponent(conversationId)}?page=${page}&limit=${PAGE_LIMIT}`,
    );
    const pageMessages = response?.data?.messages;
    const pagination = response?.data?.pagination;

    if (
      !Array.isArray(pageMessages) ||
      !Number.isInteger(pagination?.totalPages) ||
      pagination.totalPages < 0
    ) {
      throw new ApiError("La respuesta de mensajes no es válida.", 500);
    }

    messages.push(...pageMessages.map(normalizeMessage));
    totalPages = pagination.totalPages;
    page += 1;
  } while (page <= totalPages);

  return sortChronologically(messages);
};

export const createMessage = async (conversationId, payload) => {
  const response = await apiRequest(
    `/messages/conversation/${encodeURIComponent(conversationId)}`,
    {
      method: "POST",
      body: payload,
    },
  );
  const message = response?.data?.message;

  if (!message) {
    throw new ApiError("La respuesta del mensaje no es válida.", 500);
  }

  return normalizeMessage(message);
};
