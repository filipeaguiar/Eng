export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      colaboradores: {
        Row: {
          cpf: string
          created_at: string
          id: number
          nome: string
          servico: number | null
          setor: number | null
          user_id: string | null
        }
        Insert: {
          cpf: string
          created_at?: string
          id?: number
          nome?: string
          servico?: number | null
          setor?: number | null
          user_id?: string | null
        }
        Update: {
          cpf?: string
          created_at?: string
          id?: number
          nome?: string
          servico?: number | null
          setor?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "colaboradores_servico_fkey"
            columns: ["servico"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colaboradores_setor_fkey"
            columns: ["setor"]
            isOneToOne: false
            referencedRelation: "setores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colaboradores_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      estudantes: {
        Row: {
          cbo: string | null
          cnes: string | null
          conselho: string | null
          cpf: string
          created_at: string
          curso: string | null
          id: number
          matricula: string
          nome: string
          observacao: string | null
          periodo: number
          residente: boolean | null
        }
        Insert: {
          cbo?: string | null
          cnes?: string | null
          conselho?: string | null
          cpf: string
          created_at?: string
          curso?: string | null
          id?: number
          matricula: string
          nome: string
          observacao?: string | null
          periodo: number
          residente?: boolean | null
        }
        Update: {
          cbo?: string | null
          cnes?: string | null
          conselho?: string | null
          cpf?: string
          created_at?: string
          curso?: string | null
          id?: number
          matricula?: string
          nome?: string
          observacao?: string | null
          periodo?: number
          residente?: boolean | null
        }
        Relationships: []
      }
      instituicoes: {
        Row: {
          cnpj: string
          created_at: string
          endereco: string | null
          id: number
          nome: string
          telefone: string | null
        }
        Insert: {
          cnpj: string
          created_at?: string
          endereco?: string | null
          id?: number
          nome: string
          telefone?: string | null
        }
        Update: {
          cnpj?: string
          created_at?: string
          endereco?: string | null
          id?: number
          nome?: string
          telefone?: string | null
        }
        Relationships: []
      }
      programas: {
        Row: {
          created_at: string
          id: number
          instituicao_id: number
          nome: string
        }
        Insert: {
          created_at?: string
          id?: number
          instituicao_id: number
          nome: string
        }
        Update: {
          created_at?: string
          id?: number
          instituicao_id?: number
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "programas_instituicao_id_fkey"
            columns: ["instituicao_id"]
            isOneToOne: false
            referencedRelation: "instituicoes"
            referencedColumns: ["id"]
          }
        ]
      }
      servicos: {
        Row: {
          created_at: string
          enfermeiroresponsavel: number
          id: number
          medicoresponsavel: number
          nome: string
          numerovagas: number
        }
        Insert: {
          created_at?: string
          enfermeiroresponsavel: number
          id?: number
          medicoresponsavel: number
          nome: string
          numerovagas: number
        }
        Update: {
          created_at?: string
          enfermeiroresponsavel?: number
          id?: number
          medicoresponsavel?: number
          nome?: string
          numerovagas?: number
        }
        Relationships: [
          {
            foreignKeyName: "servicos_enfermeiroresponsavel_fkey"
            columns: ["enfermeiroresponsavel"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "servicos_medicoresponsavel_fkey"
            columns: ["medicoresponsavel"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          }
        ]
      }
      setores: {
        Row: {
          created_at: string
          id: number
          nome: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          nome?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          nome?: string | null
        }
        Relationships: []
      }
      vagas: {
        Row: {
          created_at: string
          estudante_id: number
          fim: string
          id: number
          inicio: string
          programa_id: number | null
          servico_id: number
        }
        Insert: {
          created_at?: string
          estudante_id: number
          fim: string
          id?: number
          inicio: string
          programa_id?: number | null
          servico_id: number
        }
        Update: {
          created_at?: string
          estudante_id?: number
          fim?: string
          id?: number
          inicio?: string
          programa_id?: number | null
          servico_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "vagas_estudante_id_fkey"
            columns: ["estudante_id"]
            isOneToOne: false
            referencedRelation: "estudantes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vagas_programa_id_fkey"
            columns: ["programa_id"]
            isOneToOne: false
            referencedRelation: "programas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vagas_servico_id_fkey"
            columns: ["servico_id"]
            isOneToOne: false
            referencedRelation: "servicos"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
