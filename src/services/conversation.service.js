import { ApiError, apiRequest } from "./api";

const normalizeConversationId = (conversation) => ({
  ...conversation,
  id: conversation._id || conversation.id,
});

export const getConversations = async () => {
  const response = await apiRequest("/conversations?limit=50");
  const conversations = response?.data?.conversations;

  if (!Array.isArray(conversations)) {
    throw new ApiError("La respuesta de conversaciones no es válida.", 500);
  }

  return conversations.map(normalizeConversationId);
};

export const createConversation = async ({ astro, title }) => {
  const response = await apiRequest("/conversations", {
    method: "POST",
    body: { astro, title },
  });
  const conversation = response?.data?.conversation;

  if (!conversation) {
    throw new ApiError("La respuesta de la conversación no es válida.", 500);
  }

  return normalizeConversationId(conversation);
};

export const deleteConversation = async (conversationId) => {
  return apiRequest(`/conversations/${conversationId}`, {
    method: "DELETE",
  });
};
