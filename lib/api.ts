import { supabase } from './supabase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class LegalRAGAPI {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async sendMessage(query: string, conversationId: string, source: string = 'statutes', scope: 'default' | 'langgraph' | 'generate-report' = 'default') {
  try {
    // Determine the correct route based on the scope
    let endpoint = '/api/ask';
    if (scope === 'langgraph') {
      endpoint = '/api/ask/langgraph';
    } else if (scope === 'generate-report') {
      endpoint = '/api/ask/generate-report';
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        source,
      }),
      signal: AbortSignal.timeout(300000),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (console.error.name === 'TimeoutError') {
      throw new Error('Request timed out. The backend is taking longer than expected (5+ minutes). Please try again or check if the server is responding.');
    }
    console.error('Error sending message:', error);
    throw error;
  }
}


  async uploadDocuments(files: FileList) {
    try {
      // Get the current user's session token
      const { data: { session } } = await supabase.auth.getSession();
      
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files', file);
      });
      
      if (session?.user?.id) {
        formData.append('user_id', session.user.id);
      }

      const response = await fetch(`${this.baseUrl}/api/upload`, {
        method: 'POST',
        headers: {
          ...(session?.access_token && {
            'Authorization': `Bearer ${session.access_token}`
          }),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading documents:', error);
      throw error;
    }
  }

  async getDocuments() {
    try {
      // Get the current user's session token
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(`${this.baseUrl}/api/documents`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching documents:', error);
      throw error;
    }
  }

  async deleteDocument(documentId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/api/documents/${documentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  async getConversations() {
    try {
      const response = await fetch(`${this.baseUrl}/api/conversations`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  }
}

export const api = new LegalRAGAPI();