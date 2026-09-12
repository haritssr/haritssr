export interface NextjsArticle {
  readonly body: string;
  readonly id: number;
  readonly title: string;
}

export interface NextjsStudent {
  readonly address: {
    readonly city: string;
  };
  readonly email: string;
  readonly id: number;
  readonly name: string;
  readonly website: string;
}

export const NextjsArticlesData = [
  {
    body: "The App Router maps folders to URLs and lets each segment own its page, layout, and loading experience.",
    id: 1,
    title: "Understanding the App Router",
  },
  {
    body: "Layouts persist between navigations, making them a useful place for shared navigation, metadata, and page chrome.",
    id: 2,
    title: "Layouts and Nested Routes",
  },
  {
    body: "Server Components can read data and render HTML without sending their implementation to the browser.",
    id: 3,
    title: "Server Components by Default",
  },
  {
    body: "Local data can be read during the build so the generated page does not depend on an external API being available.",
    id: 4,
    title: "Static Rendering with Local Data",
  },
  {
    body: "A folder such as [id] creates a dynamic segment whose value is supplied through the route params.",
    id: 5,
    title: "Dynamic Segments",
  },
  {
    body: "generateStaticParams declares the dynamic values that should be rendered ahead of time during a production build.",
    id: 6,
    title: "Generating Static Parameters",
  },
  {
    body: "Metadata can be exported directly from a route or generated from the same record that powers the page.",
    id: 7,
    title: "Route Metadata",
  },
  {
    body: "The Link component enables client-side navigation while preserving the layouts shared by nearby routes.",
    id: 8,
    title: "Linking Between Pages",
  },
  {
    body: "Loading UI gives users immediate feedback while an async Server Component is resolving its data.",
    id: 9,
    title: "Loading UI",
  },
  {
    body: "Error boundaries keep failures local to a route segment and provide a recovery action without replacing the whole app.",
    id: 10,
    title: "Error Boundaries",
  },
  {
    body: "Streaming allows the shell of a route to arrive before every async portion of the page has finished rendering.",
    id: 11,
    title: "Streaming Server Components",
  },
  {
    body: "Cached data can be reused across renders so repeated reads do not require repeating the same work.",
    id: 12,
    title: "Caching Data Requests",
  },
  {
    body: "Revalidation lets a static page stay fast while still receiving refreshed content on a controlled schedule.",
    id: 13,
    title: "Revalidating Content",
  },
  {
    body: "The notFound helper turns an unknown dynamic parameter into the route segment's standard 404 experience.",
    id: 14,
    title: "Handling Missing Pages",
  },
  {
    body: "The Image component handles responsive sizing and optimization while keeping image configuration close to the app.",
    id: 15,
    title: "Image Optimization",
  },
  {
    body: "Interactive browser behavior belongs in a small Client Component that can be imported by a Server Component page.",
    id: 16,
    title: "Client Components",
  },
  {
    body: "Server Actions provide a server-side entry point for mutations without turning an entire route into a Client Component.",
    id: 17,
    title: "Server Actions",
  },
  {
    body: "Route Handlers expose request and response behavior from the same folder-based routing system as pages.",
    id: 18,
    title: "Route Handlers",
  },
  {
    body: "Prefetching can prepare the next route before a user clicks, making navigation feel immediate.",
    id: 19,
    title: "Prefetching Links",
  },
  {
    body: "A production deployment should build from deterministic inputs so the output is reproducible in local and CI environments.",
    id: 20,
    title: "Deploying a Next.js App",
  },
] as const satisfies readonly NextjsArticle[];

export const NextjsStudentsData = [
  {
    address: { city: "South Tangerang" },
    email: "amira@example.test",
    id: 1,
    name: "Amira Wijaya",
    website: "amira.example.test",
  },
  {
    address: { city: "Bandung" },
    email: "bima@example.test",
    id: 2,
    name: "Bima Pratama",
    website: "bima.example.test",
  },
  {
    address: { city: "Jakarta" },
    email: "citra@example.test",
    id: 3,
    name: "Citra Lestari",
    website: "citra.example.test",
  },
  {
    address: { city: "Yogyakarta" },
    email: "dimas@example.test",
    id: 4,
    name: "Dimas Santoso",
    website: "dimas.example.test",
  },
  {
    address: { city: "Surabaya" },
    email: "elena@example.test",
    id: 5,
    name: "Elena Putri",
    website: "elena.example.test",
  },
  {
    address: { city: "Semarang" },
    email: "farhan@example.test",
    id: 6,
    name: "Farhan Hakim",
    website: "farhan.example.test",
  },
  {
    address: { city: "Malang" },
    email: "gita@example.test",
    id: 7,
    name: "Gita Maharani",
    website: "gita.example.test",
  },
  {
    address: { city: "Makassar" },
    email: "hadi@example.test",
    id: 8,
    name: "Hadi Nugraha",
    website: "hadi.example.test",
  },
  {
    address: { city: "Medan" },
    email: "intan@example.test",
    id: 9,
    name: "Intan Sari",
    website: "intan.example.test",
  },
  {
    address: { city: "Denpasar" },
    email: "johan@example.test",
    id: 10,
    name: "Johan Kurniawan",
    website: "johan.example.test",
  },
] as const satisfies readonly NextjsStudent[];

export function getNextjsArticle(id: string): NextjsArticle | undefined {
  const numericId = Number(id);

  return Number.isInteger(numericId)
    ? NextjsArticlesData.find((article) => article.id === numericId)
    : undefined;
}

export function getNextjsStudent(id: string): NextjsStudent | undefined {
  const numericId = Number(id);

  return Number.isInteger(numericId)
    ? NextjsStudentsData.find((student) => student.id === numericId)
    : undefined;
}
