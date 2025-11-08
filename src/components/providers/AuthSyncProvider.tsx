'use client'

import React from 'react'
import { useSupabaseAuthSync } from '@/hooks/useSupabaseAuthSync'

export function AuthSyncProvider() {
  useSupabaseAuthSync()
  return null
}