"use client";
import React, { Suspense } from "react";
import AccessContent from "../components/accessPage"

export default function access() {
return (
<Suspense fallback={<div>Loading...</div>}>
      <AccessContent/>
   </Suspense>
)
};