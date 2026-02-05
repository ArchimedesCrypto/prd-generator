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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      apps: {
        Row: {
          app_name: string
          created_at: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          app_name: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          app_name?: string
          created_at?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      backwater_api_keys: {
        Row: {
          active: boolean | null
          api_key: string
          created_at: string | null
          id: string
          name: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          active?: boolean | null
          api_key: string
          created_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          active?: boolean | null
          api_key?: string
          created_at?: string | null
          id?: string
          name?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      backwater_api_usage: {
        Row: {
          api_key_id: string | null
          calls_count: number | null
          created_at: string | null
          id: string
          month_start: string
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at: string | null
        }
        Insert: {
          api_key_id?: string | null
          calls_count?: number | null
          created_at?: string | null
          id?: string
          month_start: string
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string | null
        }
        Update: {
          api_key_id?: string | null
          calls_count?: number | null
          created_at?: string | null
          id?: string
          month_start?: string
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "backwater_api_usage_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "backwater_api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      bf_notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          notify_date: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          notify_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          notify_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bf_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      bf_workout_plans: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          plan_name: string
          start_date: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_name: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan_name?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bf_workout_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          category: string | null
          content: string | null
          created_at: string
          deepwriter_job_id: string | null
          deepwriter_project_id: string | null
          id: string
          include_seo: boolean | null
          keywords: string[] | null
          meta_description: string | null
          pdf_url: string | null
          read_time_minutes: number | null
          seo_score: number | null
          status: string
          target_audience: string | null
          title: string
          tone: string | null
          topic: string
          updated_at: string
          user_id: string
          views: number | null
          word_count: number | null
        }
        Insert: {
          category?: string | null
          content?: string | null
          created_at?: string
          deepwriter_job_id?: string | null
          deepwriter_project_id?: string | null
          id?: string
          include_seo?: boolean | null
          keywords?: string[] | null
          meta_description?: string | null
          pdf_url?: string | null
          read_time_minutes?: number | null
          seo_score?: number | null
          status?: string
          target_audience?: string | null
          title: string
          tone?: string | null
          topic: string
          updated_at?: string
          user_id: string
          views?: number | null
          word_count?: number | null
        }
        Update: {
          category?: string | null
          content?: string | null
          created_at?: string
          deepwriter_job_id?: string | null
          deepwriter_project_id?: string | null
          id?: string
          include_seo?: boolean | null
          keywords?: string[] | null
          meta_description?: string | null
          pdf_url?: string | null
          read_time_minutes?: number | null
          seo_score?: number | null
          status?: string
          target_audience?: string | null
          title?: string
          tone?: string | null
          topic?: string
          updated_at?: string
          user_id?: string
          views?: number | null
          word_count?: number | null
        }
        Relationships: []
      }
      business_plans: {
        Row: {
          additional_info: string | null
          budget: string | null
          business_name: string
          challenges: string | null
          content: string | null
          created_at: string
          deepwriter_job_id: string | null
          deepwriter_project_id: string | null
          employees: string | null
          goal: string
          id: string
          industry: string
          location: string | null
          revenue: string | null
          status: string
          target_market: string | null
          timeline: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          additional_info?: string | null
          budget?: string | null
          business_name: string
          challenges?: string | null
          content?: string | null
          created_at?: string
          deepwriter_job_id?: string | null
          deepwriter_project_id?: string | null
          employees?: string | null
          goal: string
          id?: string
          industry: string
          location?: string | null
          revenue?: string | null
          status?: string
          target_market?: string | null
          timeline?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          additional_info?: string | null
          budget?: string | null
          business_name?: string
          challenges?: string | null
          content?: string | null
          created_at?: string
          deepwriter_job_id?: string | null
          deepwriter_project_id?: string | null
          employees?: string | null
          goal?: string
          id?: string
          industry?: string
          location?: string | null
          revenue?: string | null
          status?: string
          target_market?: string | null
          timeline?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          additional_notes: string | null
          content: string | null
          created_at: string
          deepwriter_job_id: string | null
          deepwriter_project_id: string | null
          formatted_prompt: string | null
          id: string
          include_riddles: boolean
          num_players: number
          party_composition: Json
          questions_answers: string | null
          status: string
          story_type: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          additional_notes?: string | null
          content?: string | null
          created_at?: string
          deepwriter_job_id?: string | null
          deepwriter_project_id?: string | null
          formatted_prompt?: string | null
          id?: string
          include_riddles?: boolean
          num_players: number
          party_composition: Json
          questions_answers?: string | null
          status?: string
          story_type: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          additional_notes?: string | null
          content?: string | null
          created_at?: string
          deepwriter_job_id?: string | null
          deepwriter_project_id?: string | null
          formatted_prompt?: string | null
          id?: string
          include_riddles?: boolean
          num_players?: number
          party_composition?: Json
          questions_answers?: string | null
          status?: string
          story_type?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      coaching_plans: {
        Row: {
          additional_notes: string | null
          client_name: string
          content: Json | null
          created_at: string
          deepwriter_job_id: string | null
          deepwriter_project_id: string | null
          focus_areas: string[]
          id: string
          include_milestones: boolean | null
          plan_duration: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          additional_notes?: string | null
          client_name: string
          content?: Json | null
          created_at?: string
          deepwriter_job_id?: string | null
          deepwriter_project_id?: string | null
          focus_areas: string[]
          id?: string
          include_milestones?: boolean | null
          plan_duration: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          additional_notes?: string | null
          client_name?: string
          content?: Json | null
          created_at?: string
          deepwriter_job_id?: string | null
          deepwriter_project_id?: string | null
          focus_areas?: string[]
          id?: string
          include_milestones?: boolean | null
          plan_duration?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      credit_transactions: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          id: string
          stripe_payment_id: string | null
          stripe_subscription_id: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          id?: string
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          id?: string
          stripe_payment_id?: string | null
          stripe_subscription_id?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      et_patients: {
        Row: {
          additional_info: Json | null
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          additional_info?: Json | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          additional_info?: Json | null
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "et_patients_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      et_sessions: {
        Row: {
          id: string
          session_date: string | null
          session_notes: string | null
          status: string | null
          therapist_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          session_date?: string | null
          session_notes?: string | null
          status?: string | null
          therapist_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          session_date?: string | null
          session_notes?: string | null
          status?: string | null
          therapist_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "et_sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      et_therapists: {
        Row: {
          created_at: string | null
          id: string
          name: string | null
          rating: number | null
          specialty: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name?: string | null
          rating?: number | null
          specialty?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string | null
          rating?: number | null
          specialty?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      fd_degrees: {
        Row: {
          created_at: string | null
          degree_name: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          degree_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          degree_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fd_degrees_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      fd_summaries: {
        Row: {
          created_at: string | null
          degree_id: string | null
          id: string
          summary_text: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          degree_id?: string | null
          id?: string
          summary_text?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          degree_id?: string | null
          id?: string
          summary_text?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fd_summaries_degree_id_fkey"
            columns: ["degree_id"]
            isOneToOne: false
            referencedRelation: "fd_degrees"
            referencedColumns: ["id"]
          },
        ]
      }
      fwim_invites: {
        Row: {
          created_at: string | null
          id: string
          invite_text: string | null
          style_preference: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          invite_text?: string | null
          style_preference?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          invite_text?: string | null
          style_preference?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fwim_invites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      fwim_themes: {
        Row: {
          created_at: string | null
          example_url: string | null
          id: string
          invite_id: string | null
          theme_name: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          example_url?: string | null
          id?: string
          invite_id?: string | null
          theme_name?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          example_url?: string | null
          id?: string
          invite_id?: string | null
          theme_name?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fwim_themes_invite_id_fkey"
            columns: ["invite_id"]
            isOneToOne: false
            referencedRelation: "fwim_invites"
            referencedColumns: ["id"]
          },
        ]
      }
      js_positions: {
        Row: {
          created_at: string | null
          id: string
          position_title: string | null
          roadmap_id: string | null
          salary_range: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          position_title?: string | null
          roadmap_id?: string | null
          salary_range?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          position_title?: string | null
          roadmap_id?: string | null
          salary_range?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "js_positions_roadmap_id_fkey"
            columns: ["roadmap_id"]
            isOneToOne: false
            referencedRelation: "js_roadmaps"
            referencedColumns: ["id"]
          },
        ]
      }
      js_roadmaps: {
        Row: {
          created_at: string | null
          id: string
          roadmap_title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          roadmap_title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          roadmap_title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "js_roadmaps_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      lg_preferences: {
        Row: {
          created_at: string | null
          id: string
          preference_data: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          preference_data?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          preference_data?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lg_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      lg_recommendations: {
        Row: {
          created_at: string | null
          gift_idea: string | null
          id: string
          preference_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          gift_idea?: string | null
          id?: string
          preference_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          gift_idea?: string | null
          id?: string
          preference_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lg_recommendations_preference_id_fkey"
            columns: ["preference_id"]
            isOneToOne: false
            referencedRelation: "lg_preferences"
            referencedColumns: ["id"]
          },
        ]
      }
      lt_bookings: {
        Row: {
          booking_reference: string | null
          booking_type: string | null
          cost: number | null
          created_at: string | null
          id: string
          trip_id: string | null
          updated_at: string | null
        }
        Insert: {
          booking_reference?: string | null
          booking_type?: string | null
          cost?: number | null
          created_at?: string | null
          id?: string
          trip_id?: string | null
          updated_at?: string | null
        }
        Update: {
          booking_reference?: string | null
          booking_type?: string | null
          cost?: number | null
          created_at?: string | null
          id?: string
          trip_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lt_bookings_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "lt_trips"
            referencedColumns: ["id"]
          },
        ]
      }
      lt_locations: {
        Row: {
          cost_estimate: number | null
          created_at: string | null
          details: Json | null
          id: string
          location_name: string | null
          trip_id: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          cost_estimate?: number | null
          created_at?: string | null
          details?: Json | null
          id?: string
          location_name?: string | null
          trip_id?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          cost_estimate?: number | null
          created_at?: string | null
          details?: Json | null
          id?: string
          location_name?: string | null
          trip_id?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lt_locations_trip_id_fkey"
            columns: ["trip_id"]
            isOneToOne: false
            referencedRelation: "lt_trips"
            referencedColumns: ["id"]
          },
        ]
      }
      lt_trips: {
        Row: {
          budget: number | null
          created_at: string | null
          destination: string
          end_date: string | null
          id: string
          start_date: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          budget?: number | null
          created_at?: string | null
          destination: string
          end_date?: string | null
          id?: string
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          budget?: number | null
          created_at?: string | null
          destination?: string
          end_date?: string | null
          id?: string
          start_date?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lt_trips_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      mpg_plans: {
        Row: {
          created_at: string | null
          garden_name: string | null
          id: string
          location: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          garden_name?: string | null
          id?: string
          location?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          garden_name?: string | null
          id?: string
          location?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mpg_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      mpg_plantings: {
        Row: {
          created_at: string | null
          harvest_date: string | null
          id: string
          notes: string | null
          plan_id: string | null
          plant_name: string
          planting_date: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          harvest_date?: string | null
          id?: string
          notes?: string | null
          plan_id?: string | null
          plant_name: string
          planting_date?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          harvest_date?: string | null
          id?: string
          notes?: string | null
          plan_id?: string | null
          plant_name?: string
          planting_date?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mpg_plantings_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "mpg_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      mpg_reminders: {
        Row: {
          created_at: string | null
          id: string
          plan_id: string | null
          reminder_date: string | null
          reminder_type: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          plan_id?: string | null
          reminder_date?: string | null
          reminder_type?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          plan_id?: string | null
          reminder_date?: string | null
          reminder_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mpg_reminders_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "mpg_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      oml_improvements: {
        Row: {
          created_at: string | null
          id: string
          improvement_name: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          improvement_name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          improvement_name?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "oml_improvements_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      oml_schedules: {
        Row: {
          created_at: string | null
          frequency: string | null
          id: string
          improvement_id: string | null
          reminder: boolean | null
          schedule_time: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          frequency?: string | null
          id?: string
          improvement_id?: string | null
          reminder?: boolean | null
          schedule_time?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          frequency?: string | null
          id?: string
          improvement_id?: string | null
          reminder?: boolean | null
          schedule_time?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "oml_schedules_improvement_id_fkey"
            columns: ["improvement_id"]
            isOneToOne: false
            referencedRelation: "oml_improvements"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number | null
          created_at: string | null
          id: string
          status: string | null
          stripe_payment_id: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          id?: string
          status?: string | null
          stripe_payment_id?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          id?: string
          status?: string | null
          stripe_payment_id?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          credits: number
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          created_at?: string | null
          credits?: number
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          created_at?: string | null
          credits?: number
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      romance_by_me_bookmarks: {
        Row: {
          chapter_id: string | null
          created_at: string | null
          id: string
          note: string | null
          position: number
          story_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          chapter_id?: string | null
          created_at?: string | null
          id?: string
          note?: string | null
          position?: number
          story_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          chapter_id?: string | null
          created_at?: string | null
          id?: string
          note?: string | null
          position?: number
          story_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "romance_by_me_bookmarks_chapter_id_fkey"
            columns: ["chapter_id"]
            isOneToOne: false
            referencedRelation: "romance_by_me_story_chapters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romance_by_me_bookmarks_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "romance_by_me_stories"
            referencedColumns: ["id"]
          },
        ]
      }
      romance_by_me_featured_stories: {
        Row: {
          created_at: string | null
          feature_end: string | null
          feature_order: number
          feature_start: string | null
          id: string
          story_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          feature_end?: string | null
          feature_order: number
          feature_start?: string | null
          id?: string
          story_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          feature_end?: string | null
          feature_order?: number
          feature_start?: string | null
          id?: string
          story_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "romance_by_me_featured_stories_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: true
            referencedRelation: "romance_by_me_stories"
            referencedColumns: ["id"]
          },
        ]
      }
      romance_by_me_jobs: {
        Row: {
          created_at: string | null
          deepwriter_job_id: string | null
          deepwriter_project_id: string | null
          id: string
          preferences: Json | null
          prompt: string | null
          result_url: string | null
          status: string | null
          story_id: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          deepwriter_job_id?: string | null
          deepwriter_project_id?: string | null
          id?: string
          preferences?: Json | null
          prompt?: string | null
          result_url?: string | null
          status?: string | null
          story_id?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          deepwriter_job_id?: string | null
          deepwriter_project_id?: string | null
          id?: string
          preferences?: Json | null
          prompt?: string | null
          result_url?: string | null
          status?: string | null
          story_id?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      romance_by_me_ratings: {
        Row: {
          comment: string | null
          created_at: string | null
          id: string
          rating: number | null
          story_id: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          story_id?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          story_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "romance_by_me_ratings_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "romance_by_me_stories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "romance_by_me_ratings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      romance_by_me_reading_progress: {
        Row: {
          created_at: string | null
          current_chapter: number
          current_position: number
          id: string
          last_read_at: string | null
          percentage: number
          story_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_chapter?: number
          current_position?: number
          id?: string
          last_read_at?: string | null
          percentage?: number
          story_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_chapter?: number
          current_position?: number
          id?: string
          last_read_at?: string | null
          percentage?: number
          story_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "romance_by_me_reading_progress_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "romance_by_me_stories"
            referencedColumns: ["id"]
          },
        ]
      }
      romance_by_me_stories: {
        Row: {
          cover_image_url: string | null
          created_at: string | null
          id: string
          is_public: boolean | null
          preferences: Json | null
          prompt: string | null
          rating_average: number | null
          rating_count: number | null
          status: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cover_image_url?: string | null
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          preferences?: Json | null
          prompt?: string | null
          rating_average?: number | null
          rating_count?: number | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cover_image_url?: string | null
          created_at?: string | null
          id?: string
          is_public?: boolean | null
          preferences?: Json | null
          prompt?: string | null
          rating_average?: number | null
          rating_count?: number | null
          status?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "romance_by_me_stories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      romance_by_me_story_chapters: {
        Row: {
          content: string
          created_at: string | null
          id: string
          order: number
          story_id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          order: number
          story_id: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          order?: number
          story_id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "romance_by_me_story_chapters_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "romance_by_me_stories"
            referencedColumns: ["id"]
          },
        ]
      }
      romance_by_me_story_tags: {
        Row: {
          created_at: string | null
          id: string
          story_id: string
          tag: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          story_id: string
          tag: string
        }
        Update: {
          created_at?: string | null
          id?: string
          story_id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "romance_by_me_story_tags_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "romance_by_me_stories"
            referencedColumns: ["id"]
          },
        ]
      }
      romance_by_me_subscriptions: {
        Row: {
          auto_renew: boolean | null
          created_at: string | null
          end_date: string | null
          id: string
          plan: string
          start_date: string | null
          status: string
          stories_remaining: number
          stories_total: number
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          auto_renew?: boolean | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan?: string
          start_date?: string | null
          status?: string
          stories_remaining?: number
          stories_total?: number
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          auto_renew?: boolean | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          plan?: string
          start_date?: string | null
          status?: string
          stories_remaining?: number
          stories_total?: number
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      romance_by_me_user_favorite_tropes: {
        Row: {
          created_at: string | null
          id: string
          trope: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          trope: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          trope?: string
          user_id?: string
        }
        Relationships: []
      }
      romance_by_me_user_preferences: {
        Row: {
          content_preferences: Json | null
          created_at: string | null
          id: string
          notification_preferences: Json | null
          privacy_preferences: Json | null
          reading_preferences: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content_preferences?: Json | null
          created_at?: string | null
          id?: string
          notification_preferences?: Json | null
          privacy_preferences?: Json | null
          reading_preferences?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content_preferences?: Json | null
          created_at?: string | null
          id?: string
          notification_preferences?: Json | null
          privacy_preferences?: Json | null
          reading_preferences?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sm_roasts: {
        Row: {
          created_at: string | null
          id: string
          roast_level: string | null
          roast_text: string | null
          updated_at: string | null
          upload_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          roast_level?: string | null
          roast_text?: string | null
          updated_at?: string | null
          upload_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          roast_level?: string | null
          roast_text?: string | null
          updated_at?: string | null
          upload_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sm_roasts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "sm_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
      sm_uploads: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
          upload_url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          upload_url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          upload_url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sm_uploads_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      sq_quizzes: {
        Row: {
          created_at: string | null
          id: string
          quiz_title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          quiz_title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          quiz_title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sq_quizzes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      sq_results: {
        Row: {
          created_at: string | null
          id: string
          quiz_id: string | null
          score: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          quiz_id?: string | null
          score?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          quiz_id?: string | null
          score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sq_results_quiz_id_fkey"
            columns: ["quiz_id"]
            isOneToOne: false
            referencedRelation: "sq_quizzes"
            referencedColumns: ["id"]
          },
        ]
      }
      stripe_subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          id: string
          plan_name: string | null
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          plan_name?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          id?: string
          plan_name?: string | null
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stripe_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          id: string
          name: string | null
          preferences: Json | null
          stripe_customer_id: string | null
          subscription_status: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          id?: string
          name?: string | null
          preferences?: Json | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string | null
          preferences?: Json | null
          stripe_customer_id?: string | null
          subscription_status?: string | null
        }
        Relationships: []
      }
      waitlist: {
        Row: {
          created_at: string
          email: string | null
          id: string
          notified_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          notified_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          notified_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      yc_meal_plans: {
        Row: {
          created_at: string | null
          id: string
          plan_title: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          plan_title: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          plan_title?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "yc_meal_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      yc_shopping_lists: {
        Row: {
          created_at: string | null
          id: string
          item: string | null
          meal_plan_id: string | null
          quantity: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          item?: string | null
          meal_plan_id?: string | null
          quantity?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          item?: string | null
          meal_plan_id?: string | null
          quantity?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "yc_shopping_lists_meal_plan_id_fkey"
            columns: ["meal_plan_id"]
            isOneToOne: false
            referencedRelation: "yc_meal_plans"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_public_stories: {
        Args: { limit_count?: number; offset_count?: number }
        Returns: Json
      }
      get_user_data: { Args: { user_id: string }; Returns: Json }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "pilot" | "owner" | "operator" | "mro"
      subscription_tier: "free" | "paid"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["admin", "pilot", "owner", "operator", "mro"],
      subscription_tier: ["free", "paid"],
    },
  },
} as const
