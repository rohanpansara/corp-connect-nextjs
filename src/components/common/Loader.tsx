// components/Loader.tsx
export default function Loader() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-mainBackground">
        <div className="w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }
  