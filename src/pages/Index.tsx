import { lazy, Suspense, memo } from "react";
import { Cursor } from "@/components/Cursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";

// Lazy load below-fold sections for faster initial paint
const Proof = lazy(() => import("@/components/Proof").then(m => ({ default: m.Proof })));
const Work = lazy(() => import("@/components/Work").then(m => ({ default: m.Work })));
const Story = lazy(() => import("@/components/Story").then(m => ({ default: m.Story })));
const Skills = lazy(() => import("@/components/Skills").then(m => ({ default: m.Skills })));
const Process = lazy(() => import("@/components/Process").then(m => ({ default: m.Process })));
const CTA = lazy(() => import("@/components/CTA").then(m => ({ default: m.CTA })));

const SectionFallback = () => (
  <div className="py-32 md:py-44" aria-hidden="true" />
);

const Index = memo(() => {
  return (
    <SmoothScroll>
      <Cursor />
      <main className="relative">
        <Nav />
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <Proof />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Work />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Story />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Process />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <CTA />
        </Suspense>
      </main>
    </SmoothScroll>
  );
});

Index.displayName = "Index";
export default Index;
