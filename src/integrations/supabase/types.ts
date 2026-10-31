export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      assessment_responses: {
        Row: {
          answers: Json
          caregiver_experience: string | null
          completed_at: string | null
          created_at: string
          id: string
          missing_documents: Json | null
          overall_score: number | null
          parent_age_range: string | null
          recommended_modules: string[] | null
          relationship_to_parent: string | null
          score_care_burden: number | null
          score_caregiver_burnout: number | null
          score_communication: number | null
          score_daily_care: number | null
          score_emotional_wellbeing: number | null
          score_family_dynamics: number | null
          score_financial_management: number | null
          score_future_planning: number | null
          score_legal_preparedness: number | null
          score_medical_understanding: number | null
          score_quality_of_life: number | null
          score_rights_awareness: number | null
          score_safety_home: number | null
          score_support_systems: number | null
          session_id: string
          urgency_level: string | null
        }
        Insert: {
          answers?: Json
          caregiver_experience?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          missing_documents?: Json | null
          overall_score?: number | null
          parent_age_range?: string | null
          recommended_modules?: string[] | null
          relationship_to_parent?: string | null
          score_care_burden?: number | null
          score_caregiver_burnout?: number | null
          score_communication?: number | null
          score_daily_care?: number | null
          score_emotional_wellbeing?: number | null
          score_family_dynamics?: number | null
          score_financial_management?: number | null
          score_future_planning?: number | null
          score_legal_preparedness?: number | null
          score_medical_understanding?: number | null
          score_quality_of_life?: number | null
          score_rights_awareness?: number | null
          score_safety_home?: number | null
          score_support_systems?: number | null
          session_id?: string
          urgency_level?: string | null
        }
        Update: {
          answers?: Json
          caregiver_experience?: string | null
          completed_at?: string | null
          created_at?: string
          id?: string
          missing_documents?: Json | null
          overall_score?: number | null
          parent_age_range?: string | null
          recommended_modules?: string[] | null
          relationship_to_parent?: string | null
          score_care_burden?: number | null
          score_caregiver_burnout?: number | null
          score_communication?: number | null
          score_daily_care?: number | null
          score_emotional_wellbeing?: number | null
          score_family_dynamics?: number | null
          score_financial_management?: number | null
          score_future_planning?: number | null
          score_legal_preparedness?: number | null
          score_medical_understanding?: number | null
          score_quality_of_life?: number | null
          score_rights_awareness?: number | null
          score_safety_home?: number | null
          score_support_systems?: number | null
          session_id?: string
          urgency_level?: string | null
        }
        Relationships: []
      }
      donation_listings: {
        Row: {
          category: string
          contact_email: string
          contact_phone: string | null
          created_at: string | null
          description: string | null
          id: string
          item_size: string | null
          other_category: string | null
          region: string
          shipping_available: boolean | null
          status: Database["public"]["Enums"]["listing_status"] | null
          title: string
          type: Database["public"]["Enums"]["listing_type"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          category: string
          contact_email: string
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          item_size?: string | null
          other_category?: string | null
          region: string
          shipping_available?: boolean | null
          status?: Database["public"]["Enums"]["listing_status"] | null
          title: string
          type: Database["public"]["Enums"]["listing_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          category?: string
          contact_email?: string
          contact_phone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          item_size?: string | null
          other_category?: string | null
          region?: string
          shipping_available?: boolean | null
          status?: Database["public"]["Enums"]["listing_status"] | null
          title?: string
          type?: Database["public"]["Enums"]["listing_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      knowledge_resources: {
        Row: {
          category: Database["public"]["Enums"]["knowledge_category"]
          created_at: string | null
          description: string | null
          icon_name: string | null
          id: string
          is_published: boolean | null
          presentation_category: string | null
          resource_type: string
          scenario_tags: string[] | null
          sort_order: number | null
          subcategory: string | null
          tags: Json | null
          title: string
          updated_at: string | null
          url: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["knowledge_category"]
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          is_published?: boolean | null
          presentation_category?: string | null
          resource_type?: string
          scenario_tags?: string[] | null
          sort_order?: number | null
          subcategory?: string | null
          tags?: Json | null
          title: string
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["knowledge_category"]
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          is_published?: boolean | null
          presentation_category?: string | null
          resource_type?: string
          scenario_tags?: string[] | null
          sort_order?: number | null
          subcategory?: string | null
          tags?: Json | null
          title?: string
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          has_premium: boolean
          id: string
          premium_purchased_at: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          has_premium?: boolean
          id: string
          premium_purchased_at?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          has_premium?: boolean
          id?: string
          premium_purchased_at?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      scenarios: {
        Row: {
          actions_24h: Json | null
          actions_now: Json | null
          actions_week: Json | null
          created_at: string | null
          id: string
          is_published: boolean | null
          questions: Json | null
          recommended_actions: Json | null
          sort_order: number | null
          tags: string[] | null
          title: string
          trigger_phrases: string[] | null
          updated_at: string | null
          urgency_level: string | null
          what_to_prepare: Json | null
          who_to_contact: Json | null
        }
        Insert: {
          actions_24h?: Json | null
          actions_now?: Json | null
          actions_week?: Json | null
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          questions?: Json | null
          recommended_actions?: Json | null
          sort_order?: number | null
          tags?: string[] | null
          title: string
          trigger_phrases?: string[] | null
          updated_at?: string | null
          urgency_level?: string | null
          what_to_prepare?: Json | null
          who_to_contact?: Json | null
        }
        Update: {
          actions_24h?: Json | null
          actions_now?: Json | null
          actions_week?: Json | null
          created_at?: string | null
          id?: string
          is_published?: boolean | null
          questions?: Json | null
          recommended_actions?: Json | null
          sort_order?: number | null
          tags?: string[] | null
          title?: string
          trigger_phrases?: string[] | null
          updated_at?: string | null
          urgency_level?: string | null
          what_to_prepare?: Json | null
          who_to_contact?: Json | null
        }
        Relationships: []
      }
      suppliers: {
        Row: {
          admin_checklist: Json | null
          business_name: string | null
          business_number: string | null
          created_at: string
          description: string | null
          digital_link: string | null
          digital_presence: string[] | null
          email: string
          first_name: string
          has_insurance: string | null
          has_insurance_declaration: boolean
          id: string
          id_number: string
          last_name: string
          phone: string
          price_list: Json | null
          referral_1_name: string
          referral_1_phone: string
          referral_2_name: string
          referral_2_phone: string
          referral_verification_consent: boolean
          region: string[]
          service_type: string[]
          services_detail: string | null
          status: string
          trust_score: number | null
          unhappy_client_policy: string | null
          user_id: string | null
          years_experience: string | null
        }
        Insert: {
          admin_checklist?: Json | null
          business_name?: string | null
          business_number?: string | null
          created_at?: string
          description?: string | null
          digital_link?: string | null
          digital_presence?: string[] | null
          email: string
          first_name: string
          has_insurance?: string | null
          has_insurance_declaration?: boolean
          id?: string
          id_number: string
          last_name: string
          phone: string
          price_list?: Json | null
          referral_1_name: string
          referral_1_phone: string
          referral_2_name: string
          referral_2_phone: string
          referral_verification_consent?: boolean
          region?: string[]
          service_type?: string[]
          services_detail?: string | null
          status?: string
          trust_score?: number | null
          unhappy_client_policy?: string | null
          user_id?: string | null
          years_experience?: string | null
        }
        Update: {
          admin_checklist?: Json | null
          business_name?: string | null
          business_number?: string | null
          created_at?: string
          description?: string | null
          digital_link?: string | null
          digital_presence?: string[] | null
          email?: string
          first_name?: string
          has_insurance?: string | null
          has_insurance_declaration?: boolean
          id?: string
          id_number?: string
          last_name?: string
          phone?: string
          price_list?: Json | null
          referral_1_name?: string
          referral_1_phone?: string
          referral_2_name?: string
          referral_2_phone?: string
          referral_verification_consent?: boolean
          region?: string[]
          service_type?: string[]
          services_detail?: string | null
          status?: string
          trust_score?: number | null
          unhappy_client_policy?: string | null
          user_id?: string | null
          years_experience?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      knowledge_category: "forms" | "presentations" | "videos" | "other"
      listing_status: "active" | "closed"
      listing_type: "donate" | "request"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      knowledge_category: ["forms", "presentations", "videos", "other"],
      listing_status: ["active", "closed"],
      listing_type: ["donate", "request"],
    },
  },
} as const
