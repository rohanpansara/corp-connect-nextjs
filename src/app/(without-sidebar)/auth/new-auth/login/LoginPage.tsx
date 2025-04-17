import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <>
      <main className="flex items-center justify-center from-gray-100 to-gray-300 p-2 min-h-screen h-screen">
        <div className='flex h-[90%] w-full rounded-md bg-blue-100 shadow-lg p-2 gap-2 sm:max-w-[90%]'>
          <section className='w-[60%] h-full bg-gray-200 rounded-sm border-[1px] border-opacity-10 border-gray-800'></section>
          <section className='w-[40%] h-full bg-blue-100 rounded-r-sm'></section>
        </div>
      </main>
    </>
  );
};

export default LoginPage;