'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/lib/types/database'

type UserProfile = Database['public']['Tables']['user_profiles']['Row']
type UserProfileUpdate = Database['public']['Tables']['user_profiles']['Update']

export async function getUserProfile() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized', data: null }
    }

    // Get profile from user_profiles table
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    // If profile doesn't exist, create one with defaults
    if (profileError && profileError.code === 'PGRST116') {
      const { data: newProfile, error: insertError } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          email: user.email || null,
          currency: 'USD',
          language: 'en',
        })
        .select()
        .single()

      if (insertError) {
        return { error: insertError.message, data: null }
      }

      return { data: newProfile, error: null }
    }

    if (profileError) {
      return { error: profileError.message, data: null }
    }

    // Merge with auth user data for email (in case it's not in profile)
    const profileWithEmail = {
      ...profile,
      email: profile.email || user.email || null,
    }

    return { data: profileWithEmail, error: null }
  } catch (error) {
    return { error: 'Failed to fetch user profile', data: null }
  }
}

export async function updateUserProfile(data: UserProfileUpdate) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { error: 'Unauthorized' }
    }

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    let result

    if (existingProfile) {
      // Update existing profile
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .update({
          ...data,
          id: user.id, // Ensure we can't change the id
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) {
        return { error: error.message }
      }

      result = profile
    } else {
      // Create new profile if it doesn't exist
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .insert({
          id: user.id,
          email: user.email || null,
          currency: 'USD',
          language: 'en',
          ...data,
        })
        .select()
        .single()

      if (error) {
        return { error: error.message }
      }

      result = profile
    }

    revalidatePath('/settings')
    return { data: result }
  } catch (error) {
    return { error: 'Failed to update user profile' }
  }
}

