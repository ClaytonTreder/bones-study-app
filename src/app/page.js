import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-indigo-900 mb-2">
              Anatomy Study App
            </h1>
            <p className="text-lg text-indigo-700">
              Explore and learn about human anatomy
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4 items-center">
            <Link href="/skull">
              <button className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 border border-gray-300 rounded-lg font-medium text-gray-700 transition-colors">
                Skull
              </button>
            </Link>
            <Link href="/muscles">Muscles</Link>
            <Link href="/organs">Organs</Link>
            <Link href="/skull">Skull</Link>
          </div>
        </div>
      </div>
    </>
  );
}
