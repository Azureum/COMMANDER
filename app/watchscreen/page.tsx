"use client";
import React, { Suspense } from "react";
import ScreenContent from "../components/accessScreen"

export default function screen() {
    return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScreenContent/>
   </Suspense>
    );
}