<script lang="ts">
  import { Canvas } from "@threlte/core";
  import * as THREE from "three";

  import Card from "$lib/components/Card.svelte";
  import Rings from "$lib/components/shapes/Rings.svelte";
  import Loop from "$lib/components/shapes/Loop.svelte";
  import Coins from "$lib/components/shapes/Coins.svelte";
  import Core from "$lib/components/shapes/Core.svelte";
  import Rubik from "$lib/components/shapes/Rubik.svelte";
  import Travel from "$lib/components/shapes/Travel.svelte";
  import Stagger from "$lib/components/shapes/Stagger.svelte";
  import Balance from "$lib/components/shapes/Balance.svelte";
  import Pulse from "$lib/components/shapes/Pulse.svelte";
  import Pie from "$lib/components/shapes/Pie.svelte";
  import Cradle from "$lib/components/shapes/Cradle.svelte";
  import Arrows from "$lib/components/shapes/Arrows.svelte";
  import { onMount } from "svelte";
  const items = [
    { component: Rings, name: "Rings" },
    { component: Loop, name: "Loop" },
    { component: Coins, name: "Coins" },
    { component: Core, name: "Core" },
    { component: Rubik, name: "Rubik" },
    { component: Travel, name: "Travel" },
    { component: Stagger, name: "Stagger" },
    { component: Balance, name: "Balance" },
    { component: Pulse, name: "Pulse" },
    { component: Pie, name: "Pie" },
    { component: Cradle, name: "Newton's Cradle" },
    { component: Arrows, name: "Arrows" },
  ];

  let cards: HTMLDivElement[] = [];

  const handlePointerMove = (e: PointerEvent) => {
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };
</script>
<sveltekit:head>
  <title>Origami: 12+ 3D Motion Graphics </title>
</sveltekit:head>

<div class="relative mt-5 overflow-hidden">
  <div
    class="grid h-full gap-5 overflow-hidden group grid-clos-1 md:grid-cols-2 lg:grid-cols-4"
    data-gird
    on:pointermove={handlePointerMove}
  >
    {#each items as item, index}
      <Card bind:element={cards[index]} name={item.name}>
        <Canvas>
          <svelte:component this={item.component} />
        </Canvas>
      </Card>
    {/each}
  </div>

  <div
    class="fixed top-0 left-0 z-20 w-full h-screen pointer-events-none"
  ></div>
</div>
