"use client";

import { Suspense } from "react";
import { Float } from "@react-three/drei";
import Desk from "./objects/Desk";
import Book from "./objects/Book";
import Bookshelf from "./objects/Bookshelf";
import PhotoFrame from "./objects/PhotoFrame";
import Phone from "./objects/Phone";
import CoffeeMug from "./objects/CoffeeMug";
import Keyboard from "./objects/Keyboard";
import Plant from "./objects/Plant";
import NeonSign from "./objects/NeonSign";
import Pillars from "./objects/Pillars";
import WallTorches from "./objects/WallTorches";
import SoulLanterns from "./objects/SoulLanterns";
import Lighting from "./environment/Lighting";
import Floor from "./environment/Floor";
import Walls from "./environment/Walls";
import Ceiling from "./environment/Ceiling";
import Particles from "./environment/Particles";
import { useInteractiveObject } from "@/hooks/useInteractiveObject";

function InteractiveBook() {
  const { onClick, onPointerOver, onPointerOut, emissiveIntensity } =
    useInteractiveObject("projects");
  return (
    <Book
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      emissiveIntensity={emissiveIntensity}
    />
  );
}

function InteractiveBookshelf() {
  const { onClick, onPointerOver, onPointerOut, emissiveIntensity } =
    useInteractiveObject("skills");
  return (
    <Bookshelf
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      emissiveIntensity={emissiveIntensity}
    />
  );
}

function InteractivePhotoFrame() {
  const { onClick, onPointerOver, onPointerOut, emissiveIntensity } =
    useInteractiveObject("about");
  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.08}>
      <PhotoFrame
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        emissiveIntensity={emissiveIntensity}
      />
    </Float>
  );
}

function InteractivePhone() {
  const { onClick, onPointerOver, onPointerOut, emissiveIntensity } =
    useInteractiveObject("contact");
  return (
    <Float speed={2} rotationIntensity={0.04} floatIntensity={0.06}>
      <Phone
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        emissiveIntensity={emissiveIntensity}
      />
    </Float>
  );
}

const noRaycast = () => null;

export default function Room() {
  return (
    <group>
      <Lighting />

      {/* Environment — PBR textures loaded async */}
      <Suspense fallback={null}>
        <Floor />
        <Walls />
        <Ceiling />
      </Suspense>

      <Particles />

      {/* Architectural elements */}
      <Pillars />
      <WallTorches />
      <SoulLanterns />

      {/* Interactive objects */}
      <InteractiveBook />
      <InteractiveBookshelf />
      <InteractivePhotoFrame />
      <InteractivePhone />

      {/* Ambient objects — no pointer events */}
      <group raycast={noRaycast}>
        <Desk />
        <CoffeeMug />
        <Keyboard />
        <Plant />
        <NeonSign />
      </group>
    </group>
  );
}
