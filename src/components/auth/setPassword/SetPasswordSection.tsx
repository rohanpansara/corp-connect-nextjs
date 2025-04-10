import LoginIllustration from '@/components/login/LoginIllustration'

const SetPasswordSection = () => {
  return (
    <div className='flex w-full xl:w-[90%] h-screen min-h-screen bg-[#0940AE] gap-x-10'>
      {/* First Section: Office Illustration Image */}
      <section className='hidden xl:flex w-1/2 h-full bg-cover bg-center'>
        <LoginIllustration />
      </section>

      {/* Second Section: Set Password */}
      <section className='flex w-[60%] xl:w-1/2 mx-auto h-full justify-center items-center'>
        <span className='font-bold text-xl'>Jai Ho</span>
      </section>
    </div>
  )
}

export default SetPasswordSection
