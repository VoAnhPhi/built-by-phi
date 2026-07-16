import React from "react";
import BrutalHero from "@/components/Section/BrutalHero";
import BrutalManifesto from "@/components/Section/BrutalManifesto";
import BrutalAbout from "@/components/Section/BrutalAbout";
import BrutalWorks from "@/components/Section/BrutalWorks";
// import BrutalStack from "@/components/Section/BrutalStack";
import BrutalContact from "@/components/Section/BrutalContact";
import BrutalTrajectory from "@/components/Section/BrutalTrajectory";

export default function Home() {
    return (
        <div className="brutal-homepage">
            <BrutalHero />
            <BrutalAbout />
            <BrutalManifesto />
            <BrutalWorks />
            <BrutalTrajectory />
            <BrutalContact />
        </div>
    );
}
