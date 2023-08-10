import Section from "@/components/Section";
import InternalLink from "@/components/InternalLink";
import ExternalLink from "@/components/ExternalLink";
import Layout from "@/components/Layout";
import React from "react";
import { color } from "../data/DesignSystemData";
import Image from "next/image";

import { useState } from "react";
import { Switch } from "@headlessui/react";

import { XMarkIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import { PageTitle } from "@/components/SubTitle";

export default function DesignSystem() {
  return (
    <Layout browserTitle="Design Systems" description="Design Systems">
      <PageTitle title="Design Systems">
        This design system used in{" "}
        <ExternalLink name="haritssr.com" href="haritssr.com" /> and{" "}
        <ExternalLink name="Haris Lab" href="harislab.com" />
      </PageTitle>
      <div className="mt-5 space-y-20">
        <iframe
          className="border w-full min-h-screen"
          width="800"
          height="450"
          src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FmhfH2JaaCDzRSL71XcSnUw%2FHaris-Lab%3Ftype%3Ddesign%26node-id%3D1416%253A236%26mode%3Ddesign%26t%3DwxLQxcZHLYNHFvrj-1"
          allowFullScreen
        ></iframe>
      </div>
    </Layout>
  );
}
