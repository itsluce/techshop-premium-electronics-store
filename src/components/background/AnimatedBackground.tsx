'use client';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-gray-50 to-gray-100 dark:from-black dark:via-gray-950 dark:to-black" />

      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/20 dark:bg-blue-900/5 rounded-full blur-3xl animate-pulse"
           style={{ animationDuration: '8s' }} />

      <div className="absolute top-1/4 right-0 w-[32rem] h-[32rem] bg-gray-400/20 dark:bg-blue-900/5 rounded-full blur-3xl animate-pulse"
           style={{ animationDuration: '10s', animationDelay: '2s' }} />

      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-pink-400/20 dark:bg-pink-900/5 rounded-full blur-3xl animate-pulse"
           style={{ animationDuration: '12s', animationDelay: '4s' }} />

      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-teal-400/20 dark:bg-teal-900/5 rounded-full blur-3xl animate-pulse"
           style={{ animationDuration: '9s', animationDelay: '1s' }} />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-orange-400/10 dark:bg-orange-900/3 rounded-full blur-3xl animate-pulse"
           style={{ animationDuration: '15s', animationDelay: '3s' }} />

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 dark:opacity-10" />
    </div>
  );
}
