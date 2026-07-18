import { ApiError, apiRequest } from "./api";
import { normalizeMessage } from "./message.service";

export const sendChatMessage = async (conversationId, content) => {
  const response = await apiRequest(
    `/chat/conversation/${encodeURIComponent(conversationId)}`,
    {
      method: "POST",
      body: { content },
    },
  );
  const userMessage = response?.data?.userMessage;
  const assistantMessage = response?.data?.assistantMessage;

  if (!userMessage || !assistantMessage) {
    throw new ApiError("La respuesta del chat no es válida.", 500);
  }

  return {
    userMessage: normalizeMessage(userMessage),
    assistantMessage: normalizeMessage(assistantMessage),
  };
};
