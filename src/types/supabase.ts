export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      produtos: {
        Row: {
          id: string;
          titulo: string;
          tipo: string; // "ebook" | "audiobook" | "podcast"
          preco: number;
          imagem: string;
        };
        Insert: {
          id?: string;
          titulo: string;
          tipo: string;
          preco: number;
          imagem: string;
        };
        Update: {
          id?: string;
          titulo?: string;
          tipo?: string;
          preco?: number;
          imagem?: string;
        };
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
};

