import { ShowGetVideos } from "@/components/all-vidoes";
import CheckSignIn from "@/components/clerk-sign-button/check-sign";
import GradientBlinds from "@/components/GradientBlinds";
import HeroSection from "@/components/hero/hero-section";
import Shade from "@/components/hero/shade";
import { ShaderAnimation } from "@/components/hero/shader-hero";
import FAQSection from "@/components/home/ui/faq-section";
import FeaturesSection from "@/components/home/ui/features-section";
import ProofSection from "@/components/home/ui/proof-section";
import TestimonialsSection from "@/components/home/ui/testimonials-section";
import LightRays from "@/components/LightRays";
import { ScreenRecorderDialog } from "@/components/recording/screen-recorder-dialog";
import { ShowAllVideo } from "@/components/recording/show-all-video";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VideoGridSkeleton } from "@/components/video-skeleton";
import React, { Suspense } from "react";

const Home = () => {
	return (
		<>
		 <Shade/>
			{/* <HeroSection /> */}
			<ProofSection />
			<FeaturesSection />
			<TestimonialsSection />
			<FAQSection />
			{/* <div className="mx-7 py-20">
          <Suspense fallback={<VideoGridSkeleton />}>
            <ShowGetVideos />
          </Suspense>
        </div> */}
		</>
	);
};

export default Home;
