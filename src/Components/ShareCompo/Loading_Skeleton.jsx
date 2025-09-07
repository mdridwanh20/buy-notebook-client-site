import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading_Skeleton() {
  return (
    <div className="flex h-screen justify-center items-center container m-auto py-10">
        
      <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">

        <div className="w-full shadow-md   space-y-4">
          {/* Image placeholder */}
          <Skeleton height={180} className="rounded-xl" />

          {/* Title placeholder */}
          <Skeleton height={24} width={`80%`} />

          {/* Description lines */}
          <Skeleton count={2} />

          {/* Button placeholder */}
          <Skeleton height={40} width={`50%`} className="rounded-lg" />
        </div>

      </SkeletonTheme>

    </div>
  );
}
