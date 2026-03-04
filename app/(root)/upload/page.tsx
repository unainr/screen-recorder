import { CreateRecordForm } from '@/components/recording/create-record-form'
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const UploadPage = async () => {
  const {userId} = await auth()
    if (!userId) {
      redirect("/"); // redirect to homepage (modal can open there)
    }
  return (
    <><CreateRecordForm/></>
  )
}

export default UploadPage