import { CardBody, CardContainer, CardItem } from "@/components/global/3dCard";
import { ContainerScroll } from "@/components/global/ContainerScroll";
import { HeroParallax } from "@/components/global/HeroParallax";
import { InfiniteMovingCards } from "@/components/global/InfiniteMovingCards";
import { LampEffect } from "@/components/global/LampEffect";
import Navbar from "@/components/global/Navbar";
import { Button } from "@/components/ui/button";
import { clients, products } from "@/lib/constants";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <main className="flex items-center justify-center flex-col">
    <Navbar />
    <section className=" w-full bg-neutral-950 rounded-md !overflow-visible relative flex flex-col items-center">
      <div className="absoulte inset-0 h-full w-full items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]">
        <div className="flex flex-col mt-[-50px]">
          <ContainerScroll
          titleComponent={
            <div className="flex flex-col items-center md:mb-[2em]">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-b from-white to-neutral-600 bg-clip-text text-transparent">
                Automate Your Work With Fuzzie
              </h1>
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 my-3">
          Start Your Free Trail
        </button>

          </div>
          }
          >
            <Image
             src={`/temp-banner.png`}
             alt="hero"
             height={720}
             width={1400}
             className="mx-auto rounded-2xl object-cover h-full object-left-top"
             draggable={false}
             priority={true}
            />
          </ContainerScroll>
        </div>
      </div>
    </section>
    <section className="bg-white mt-[-8em]">
      <InfiniteMovingCards
      items={clients}
      direction="right"
      speed="slow"
      className="w-screen"
      />
    </section>
    <section className="w-full">
      <HeroParallax products={products}/>
    </section>
    <section className="">
      <LampEffect />
      <div className=" flex flex-wrap items-center justify-center flex-col md:flex-row md:gap-10 mt-[-20em] pt-10">
          <CardContainer className="inter-var h-[385px]">
            <CardBody className="text-neutral-200 w-[20em] p-6 border rounded-2xl text-sm">
              <CardItem translateZ={20} as='div' className="font-bold text-xl">
                Hobby
              </CardItem>
              <CardItem translateZ={20} as='div' className="font-bold text-5xl mt-1">
                $0
              </CardItem>
              <CardItem as='p' translateZ={10} className="my-3">
              Get a glimpse of what our software is capable of. Just a heads
              up {"you'll"} never leave us after this!
              </CardItem>
              <CardItem translateZ={10}>
              <ul >
                <li className='flex gap-3 mb-2'>
                  <CheckIcon /> Free automations
                </li>
                <li className='flex gap-3 mb-2'>
                  <CheckIcon />  Two-step Actions
                </li>
                <li className='flex gap-3 mb-2'>
                  <CheckIcon />  100 tasks per month
                </li>
              </ul>
              </CardItem>
              <CardItem translateZ={20} className="w-full">
                <div className="flex items-center justify-between mt-10">
                  <Link href='/dashboard' target='_blank'>Try now →</Link>
                  <button className="bg-white text-xs text-black p-2 font-semibold rounded-xl">Get Started Now</button>
                </div>
              </CardItem>

            </CardBody>
          </CardContainer>

          <CardContainer className="inter-var">
            <CardBody className="text-neutral-200 w-[20em] p-6 border border-white rounded-2xl text-sm">
              <CardItem translateZ={20} as='div' className="font-bold text-xl">
                Pro Plan
              </CardItem>
              <CardItem translateZ={20} as='div' className="font-bold text-5xl mt-1">
                $29
              </CardItem>
              <CardItem as='p' translateZ={10} className="my-3">
              Get a glimpse of what our software is capable of. Just a heads
              up {"you'll"} never leave us after this!
              </CardItem>
              <CardItem translateZ={10}>
              <ul >
                <li className='flex gap-3 mb-2'>
                  <CheckIcon /> Free automations
                </li>
                <li className='flex gap-3 mb-2'>
                  <CheckIcon />  Two-step Actions
                </li>
                <li className='flex gap-3 mb-2'>
                  <CheckIcon />  10,000 tasks per month
                </li>
              </ul>
              </CardItem>
              <CardItem translateZ={20} className="w-full">
                <div className="flex items-center justify-between mt-10"><Link href='/dashboard' target='_blank'>Try now →</Link>
                <button className="bg-white text-xs text-black p-2 font-semibold rounded-xl">Get Started Now</button></div>
              </CardItem>

            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var">
            <CardBody className="text-neutral-200 w-[20em] p-6 border rounded-2xl text-sm">
              <CardItem translateZ={20} as='div' className="font-bold text-xl">
                Unlimited
              </CardItem>
              <CardItem translateZ={20} as='div' className="font-bold text-5xl mt-1">
                $99
              </CardItem>
              <CardItem as='p' translateZ={10} className="my-3">
              Get a glimpse of what our software is capable of. Just a heads
              up {"you'll"} never leave us after this!
              </CardItem>
              <CardItem translateZ={10}>
              <ul >
                <li className='flex gap-3 mb-2'>
                  <CheckIcon /> Unlimited automations
                </li>
                <li className='flex gap-3 mb-2'>
                  <CheckIcon />  Two-step Actions
                </li>
                <li className='flex gap-3 mb-2'>
                  <CheckIcon />  Unlimited tasks
                </li>
              </ul>
              </CardItem>
              <CardItem translateZ={20} className="w-full">
                <div className="flex items-center justify-between mt-10"><Link href='/dashboard' target='_blank'>Try now →</Link>
                <button className="bg-white text-xs text-black p-2 font-semibold rounded-xl">Get Started Now</button></div>
              </CardItem>

            </CardBody>
          </CardContainer>
      </div>
    </section>
   
   </main>
  );
}
