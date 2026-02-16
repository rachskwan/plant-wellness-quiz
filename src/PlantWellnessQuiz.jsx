import { useState, useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  Cactus, FlowerTulip, TreePalm, Tree, OrangeSlice, Flower,
  Leaf, Plant, TreeEvergreen, FlowerLotus,
  Grains, Waves, Mountains, Sun, Snowflake,
  Carrot, PottedPlant, Drop, Butterfly,
  Flask, Warning, Check, ArrowCounterClockwise,
  Path, CloudSun, CloudLightning, Wind, Signpost,
  Binoculars, Timer, SunHorizon, Footprints,
  Handshake, Fire, ShareNetwork
} from "@phosphor-icons/react";

// Question illustration icons and colors
const questionIllustrations = [
  { icon: Footprints, color: "#8b7355", bg: "#f5f0e8" },    // 1. The Trailhead
  { icon: TreeEvergreen, color: "#4a7c59", bg: "#e8f5e9" }, // 2. Into the Trees
  { icon: Waves, color: "#5c9ead", bg: "#e3f2fd" },         // 3. The Stream
  { icon: CloudSun, color: "#e8b44c", bg: "#fff8e1" },      // 4. The Canopy
  { icon: Flower, color: "#c490b8", bg: "#fce4ec" },        // 5. The Grove
  { icon: CloudLightning, color: "#607d8b", bg: "#eceff1" },// 6. The Storm
  { icon: Wind, color: "#78909c", bg: "#f5f5f5" },          // 7. The Aftermath
  { icon: Signpost, color: "#8d6e63", bg: "#efebe9" },      // 8. The Fork
  { icon: Mountains, color: "#795548", bg: "#efebe9" },     // 9. The Ridge
  { icon: Binoculars, color: "#5d8a66", bg: "#e8f5e9" },    // 10. The Overlook
  { icon: Waves, color: "#4a6fa5", bg: "#e3f2fd" },         // 11. The Valley
  { icon: Timer, color: "#9c8340", bg: "#fff8e1" },         // 12. The Clearing
  { icon: FlowerLotus, color: "#d4829c", bg: "#fce4ec" },   // 13. The Meadow
  { icon: SunHorizon, color: "#e57c23", bg: "#fff3e0" },    // 14. The Horizon
  { icon: Cactus, color: "#a07850", bg: "#fbe9e7" },        // 15. The Dry Season
];

// Question illustration component
const QuestionIllustration = ({ questionIndex }) => {
  const illus = questionIllustrations[questionIndex];
  if (!illus) return null;
  const IconComponent = illus.icon;
  return (
    <div style={{
      width: "100%",
      height: 120,
      borderRadius: 16,
      background: illus.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
    }}>
      <IconComponent size={56} weight="duotone" color={illus.color} />
    </div>
  );
};

// Icon mapping for plants
const plantIcons = {
  succulent: Cactus,
  orchid: FlowerTulip,
  bamboo: TreePalm,
  oak: Tree,
  fruitTree: OrangeSlice,
  wildflower: Flower,
  vine: Leaf,
  moss: Plant,
  bonsai: TreeEvergreen,
  mushroom: Carrot, // Using Carrot as closest veggie icon
  maple: Leaf,
  lotus: FlowerLotus,
};

// Icon mapping for vitality dimensions
const vitalityIcons = {
  roots: Plant,
  soil: PottedPlant,
  sunlight: Sun,
  water: Drop,
  pollination: Butterfly,
};

// VitalityIcon component
const VitalityIcon = ({ vitalityKey, size = 24, color, className = "" }) => {
  const IconComponent = vitalityIcons[vitalityKey];
  if (!IconComponent) return <Plant size={size} weight="duotone" color={color} className={className} />;
  return <IconComponent size={size} weight="duotone" color={color} className={className} />;
};

// Icon mapping for resilience types
const resilienceIcons = {
  "Physiological Adaptation": Drop,
  "Environmental Sensitivity": Flask,
  "Structural Resilience": Plant,
  "Community & Ecosystem": Handshake,
  "Reproductive & Regenerative": ArrowCounterClockwise,
  "Network Resilience": ShareNetwork,
  "Seasonal Resilience": Fire,
};

const ResilienceIcon = ({ resilienceType, size = 16, color, className = "" }) => {
  const IconComponent = resilienceIcons[resilienceType];
  if (!IconComponent) return <Plant size={size} weight="duotone" color={color} className={className} />;
  return <IconComponent size={size} weight="duotone" color={color} className={className} />;
};

// Icon mapping for habitats
const habitatIcons = {
  forestFloor: TreeEvergreen,
  openMeadow: Grains,
  riverbank: Waves,
  rockyRidge: Mountains,
};

// Icon mapping for seasons
const seasonIcons = {
  spring: Plant,
  summer: Sun,
  autumn: Leaf,
  winter: Snowflake,
};

// PlantIcon component
const PlantIcon = ({ plantKey, size = 24, color, className = "" }) => {
  const IconComponent = plantIcons[plantKey];
  if (!IconComponent) return <Plant size={size} weight="duotone" color={color} className={className} />;
  return <IconComponent size={size} weight="duotone" color={color} className={className} />;
};

// HabitatIcon component
const HabitatIcon = ({ habitatKey, size = 24, color, className = "" }) => {
  const IconComponent = habitatIcons[habitatKey];
  if (!IconComponent) return <TreeEvergreen size={size} weight="duotone" color={color} className={className} />;
  return <IconComponent size={size} weight="duotone" color={color} className={className} />;
};

// SeasonIcon component
const SeasonIcon = ({ seasonKey, size = 24, color, className = "" }) => {
  const IconComponent = seasonIcons[seasonKey];
  if (!IconComponent) return <Plant size={size} weight="duotone" color={color} className={className} />;
  return <IconComponent size={size} weight="duotone" color={color} className={className} />;
};

const questions = [
  {
    id: 1, section: "The Trailhead",
    question: "Imagine you're standing at the entrance to a forest. Before you step in, check in with yourself — your body, your sleep, your energy. How solid does the ground feel under your feet?",
    options: [
      { text: "The ground feels steady — I couldn't be more ready", emoji: "🌿", scores: { oak: 3, mushroom: 2, maple: 2, fruitTree: 1 } },
      { text: "The ground feels slightly shifted — some days are good, some aren't", emoji: "🌱", scores: { bamboo: 1, wildflower: 2, moss: 1 } },
      { text: "The ground feels rocky — I struggle to take care of myself", emoji: "🥀", scores: { succulent: 2, vine: 1, moss: 2, lotus: 3 } },
      { text: "The ground feels fragile — I'm barely keeping up", emoji: "😟", scores: { orchid: 2, vine: 2, moss: 1 } },
    ],
  },
  {
    id: 2, section: "Into the Trees",
    question: "You step forward. The canopy closes overhead. This forest is the world you live in — the people, places, and systems around you. Does it feel like it's helping you grow, or are you pushing through alone?",
    options: [
      { text: "The forest opens up for me — I feel supported by my environment", emoji: "💛", scores: { fruitTree: 2, maple: 2, wildflower: 2, mushroom: 1 } },
      { text: "Some clearings, some overgrowth — the support comes and goes", emoji: "🤔", scores: { bamboo: 2, wildflower: 2, bonsai: 2 } },
      { text: "The path is tangled — I rarely feel understood here", emoji: "😞", scores: { succulent: 3, orchid: 2, moss: 1, lotus: 2 } },
      { text: "I can't see a way through — I feel isolated and stuck", emoji: "🥺", scores: { orchid: 2, vine: 3, moss: 1 } },
    ],
  },
  {
    id: 3, section: "The Stream",
    question: "Up ahead, you hear water. A stream cuts across the trail — cool and clear. It represents the things that actually fill you back up: rest, hobbies, quiet moments. How often do you stop and drink?",
    options: [
      { text: "I drink often — I regularly make time for things that recharge me", emoji: "💖", scores: { oak: 2, bonsai: 3, fruitTree: 2 } },
      { text: "I sip when I can — sometimes I make the time, sometimes I don't", emoji: "🌸", scores: { bamboo: 1, wildflower: 2, fruitTree: 1 } },
      { text: "I walk past most days — I know I should stop, but I don't", emoji: "🌾", scores: { moss: 2, succulent: 2, vine: 1, mushroom: 1, lotus: 1 } },
      { text: "I forgot the stream was there — I've lost touch with what fills me up", emoji: "😔", scores: { orchid: 2, vine: 2, moss: 2 } },
    ],
  },
  {
    id: 4, section: "The Canopy",
    question: "You cross the stream and keep walking. The trees grow taller and thicker. You look up — somewhere above the canopy there's sunlight. Think of it as opportunities, mentors, open doors. How much of that light reaches you?",
    options: [
      { text: "The light pours through — I have access to what I need to grow", emoji: "🌞", scores: { mushroom: 3, fruitTree: 2, bamboo: 2 } },
      { text: "Dappled — some opportunities reach me, others don't", emoji: "🌤", scores: { wildflower: 2, bamboo: 2, maple: 2 } },
      { text: "Dim — I'm not getting much guidance or opportunity", emoji: "😶", scores: { succulent: 2, moss: 2, bonsai: 1, lotus: 1 } },
      { text: "Dark — I can't see a path forward right now", emoji: "🌫", scores: { orchid: 2, vine: 2, moss: 2 } },
    ],
  },
  {
    id: 5, section: "The Grove",
    question: "The trail opens into a grove. Other things are growing here — some close, some further away. This is your community. People who care about you, who make you feel safe. Look around. Are they here?",
    options: [
      { text: "The grove is full — I have lots of people who show up for me", emoji: "💕", scores: { wildflower: 3, maple: 3, mushroom: 2, fruitTree: 2 } },
      { text: "A few things growing nearby — my circle is small but real", emoji: "🌱", scores: { oak: 2, bamboo: 2, fruitTree: 2 } },
      { text: "Mostly empty — I don't have many people I can count on", emoji: "🥀", scores: { succulent: 3, bonsai: 2, lotus: 2 } },
      { text: "Just me out here — I've been on my own for a while", emoji: "😢", scores: { orchid: 2, vine: 3, moss: 1 } },
    ],
  },
  {
    id: 6, section: "The Storm",
    question: "You're still in the grove when the sky darkens. Wind shakes the branches. A storm rolls in — a setback, a conflict, a hard season. It's here. What do you do?",
    options: [
      { text: "I run through the rain — I adapt on the fly and keep moving", emoji: "🌾", scores: { bamboo: 3, wildflower: 2, fruitTree: 2 } },
      { text: "I brace against the wind — I push through it one step at a time", emoji: "🌳", scores: { oak: 3, mushroom: 3, bonsai: 2, maple: 2 } },
      { text: "I find shelter — I focus only on what I can control", emoji: "🌿", scores: { bonsai: 3, succulent: 2, moss: 2, lotus: 2 } },
      { text: "I wait out the storm — I don't act until the worst has passed", emoji: "🌻", scores: { orchid: 2, lotus: 3 } },
    ],
  },
  {
    id: 7, section: "The Aftermath",
    question: "The rain stops. Branches are down, puddles everywhere, the trail rearranged. The storm changed things. How does the new landscape feel?",
    options: [
      { text: "Every fallen branch hits me — I feel even small changes deeply", emoji: "🍃", scores: { orchid: 4, bonsai: 1, lotus: 1 } },
      { text: "The trail is different, but I'll find a new route — I adjust quickly", emoji: "🌞", scores: { bamboo: 3, maple: 3 } },
      { text: "The ground beneath is the same — I don't absorb it that deeply", emoji: "🌱", scores: { succulent: 3, moss: 2, oak: 1, fruitTree: 1 } },
      { text: "I've weathered worse storms — very little shakes me now", emoji: "🌳", scores: { oak: 3, mushroom: 3 } },
    ],
  },
  {
    id: 8, section: "The Fork",
    question: "You keep moving when the trail splits in two. You need something you can't reach alone — an answer, a resource, a nudge. Do you call out, or find your own way?",
    options: [
      { text: "I pick a path myself — I figure things out solo", emoji: "🌿", scores: { succulent: 3, bonsai: 2, oak: 1, mushroom: 1 } },
      { text: "I call out first — I seek input, but make my own call", emoji: "🌾", scores: { bamboo: 2, wildflower: 2, fruitTree: 1, lotus: 2 } },
      { text: "I wait for company — I prefer to have someone with me", emoji: "🌸", scores: { vine: 3, wildflower: 1 } },
      { text: "I'm stuck at the fork — I struggle to move forward without help", emoji: "🌻", scores: { vine: 4, orchid: 1 } },
    ],
  },
  {
    id: 9, section: "The Ridge",
    question: "You pick a path and it starts to climb. Rock replaces soft ground, the air thins. You're heading toward something — a goal, a version of yourself you're building. How do you spend your energy on the way up?",
    options: [
      { text: "One step at a time — I keep a steady pace and don't burn out", emoji: "🌳", scores: { oak: 3, mushroom: 3, moss: 2 } },
      { text: "I sprint, then rest — I go hard in bursts and recover between", emoji: "⚡", scores: { bamboo: 3, wildflower: 3, maple: 3 } },
      { text: "I ration the climb — I only spend energy I know I have", emoji: "🌿", scores: { succulent: 3, bonsai: 3, orchid: 2 } },
      { text: "I wait for the right stretch — then give it everything at once", emoji: "🌸", scores: { lotus: 3, fruitTree: 3, vine: 2 } },
    ],
  },
  {
    id: 10, section: "The Overlook",
    question: "You reach the top. The whole valley stretches out behind you — the trailhead, the stream, the grove, the storm. You look back. What tells you you're doing okay?",
    options: [
      { text: "I see landmarks behind me — I measure progress by tangible results", emoji: "🍎", scores: { fruitTree: 4, mushroom: 2, maple: 2 } },
      { text: "I'm still on the trail — just showing up is enough for me", emoji: "🌳", scores: { oak: 3, moss: 2 } },
      { text: "The view looks different than when I started — I've grown and changed", emoji: "🌱", scores: { bamboo: 3, wildflower: 2, maple: 4 } },
      { text: "I packed lighter along the way — I know exactly what I need now", emoji: "🌿", scores: { bonsai: 3, orchid: 2 } },
    ],
  },
  {
    id: 11, section: "The Valley",
    question: "The trail descends into a valley. The stream from earlier has become a river — swollen, spilling over its banks, rising around your ankles. Everything hits at once. What's your instinct?",
    options: [
      { text: "I climb to higher ground — I pull back and protect my energy", emoji: "🥀", scores: { succulent: 4, moss: 2, lotus: 2 } },
      { text: "I grab whoever's near me — we wade through it together", emoji: "🌾", scores: { vine: 3, wildflower: 2 } },
      { text: "I keep my footing — I've crossed rough water before", emoji: "🌳", scores: { oak: 3, mushroom: 3, bonsai: 1 } },
      { text: "I stand still and read the current — I wait for the right moment to move", emoji: "🌻", scores: { lotus: 3, orchid: 2 } },
    ],
  },
  {
    id: 12, section: "The Clearing",
    question: "The water recedes. You rest in a sun-dappled clearing. Time passes — weeks, months blur together. You notice your energy and mood shifting in patterns. Is there a rhythm, or does it feel random?",
    options: [
      { text: "I bloom and go dormant — I have strong highs and real lows in cycles", emoji: "🌻", scores: { fruitTree: 3, maple: 4, lotus: 3 } },
      { text: "I shift with the weather — my energy follows whatever's happening", emoji: "🌾", scores: { bamboo: 3, wildflower: 2 } },
      { text: "Same pace rain or shine — I stay steady regardless", emoji: "🌳", scores: { oak: 3, mushroom: 2 } },
      { text: "I only bloom in the right conditions — I thrive specifically, not broadly", emoji: "🌿", scores: { orchid: 3, bonsai: 2 } },
    ],
  },
  {
    id: 13, section: "The Meadow",
    question: "The trees thin and fall away. You step into a wide-open meadow — warm sun, tall grass, wildflowers. A memory surfaces: a time when everything clicked, when you felt like yourself. What did that growth look like?",
    options: [
      { text: "I bent with the wind — I grew by adapting fast to whatever came", emoji: "🎋", scores: { bamboo: 4, vine: 2 } },
      { text: "I spread across the meadow — I grew by connecting with people around me", emoji: "🌸", scores: { wildflower: 4, maple: 3 } },
      { text: "I grew so slowly no one noticed — small, quiet progress every day", emoji: "🍃", scores: { moss: 4, bonsai: 2 } },
      { text: "I survived the dry season — I made the most of very little", emoji: "🌵", scores: { succulent: 4, orchid: 2 } },
    ],
  },
  {
    id: 14, section: "The Horizon",
    question: "You cross the meadow and reach the far edge where the land drops away. Miles of open country. Past the next season, past the next year. What's the thing on that horizon that keeps pulling you forward?",
    options: [
      { text: "A tree others can rest under — being dependable and present for my people", emoji: "🌳", scores: { oak: 4, fruitTree: 2 } },
      { text: "A forest I'm planting now — building something that outlasts me", emoji: "🏔️", scores: { mushroom: 4, lotus: 2 } },
      { text: "A meadow in full bloom — creating joy and sharing it with others", emoji: "🌺", scores: { wildflower: 3, maple: 4 } },
      { text: "One perfect tree — mastering my craft with nothing wasted", emoji: "✂️", scores: { bonsai: 3, orchid: 3 } },
    ],
  },
  {
    id: 15, section: "The Dry Season",
    question: "One last stretch. The trail turns downhill and the landscape dries out — cracked soil, no shade. Everything is scarce: time, energy, money, support. What do you do when there isn't enough?",
    options: [
      { text: "I find hidden water — I get creative and find resources others miss", emoji: "🌾", scores: { bamboo: 3, vine: 3 } },
      { text: "I close up and go small — I cut back to essentials and endure", emoji: "🌵", scores: { succulent: 4, mushroom: 2 } },
      { text: "I share my water — I lean on my people and we get through it together", emoji: "💛", scores: { wildflower: 3, fruitTree: 2, maple: 2 } },
      { text: "I keep walking at the same pace — drought or not, I don't change", emoji: "🍃", scores: { moss: 4, oak: 2 } },
    ],
  },
];

const plantProfiles = {
  succulent: {
    key: "succulent", name: "Succulent", icon: "🪴", core: "Resilient Self-Sufficiency", color: "#7ec8a0", accent: "#b8e6cc",
    reflection: "Which small, repeated habits could give you steady energy and resilience?",
    description: "You carry a quiet, powerful strength. Like a succulent, you've learned to store your own reserves and weather dry spells through sheer resourcefulness. You don't need much to survive—but thriving asks you to let a little more in.",
    habits: ["Micro-hydration reminders throughout the day", "5-minute guided meditation or breathing", "Short walks, even just around the block", "One small self-care ritual before bed"],
    funFact: "Succulents store water in their thick leaves and stems, allowing some species to survive months without rain. Their waxy coating (called a cuticle) reduces water loss—basically nature's version of protecting your energy reserves.",
    resilienceType: "Physiological Adaptation",
    resilienceIcon: "💧",
    resilience: "The fact that you can endure on very little doesn't mean you should have to. You've proven your toughness. Now the brave thing is letting yourself need more. You don't have to earn care by first proving you can go without it."
  },
  orchid: {
    key: "orchid", name: "Orchid", icon: "🌺", core: "Sensitive & Environmental Tuning", color: "#c490b8", accent: "#e4bcd8",
    reflection: "Which parts of your environment could you adjust to feel safe and thrive?",
    description: "You feel the world deeply—light, temperature, energy, moods. Like an orchid, you bloom spectacularly when conditions are right, and struggle when they're not. Your sensitivity isn't a weakness; it's a signal system. Honor it.",
    habits: ["Reduce overstimulation—noise, screens, clutter", "Create one nurturing space that feels truly safe", "Check in with your triggers and energy drains", "Schedule quiet recovery after intense experiences"],
    funFact: "Orchids are one of the largest flowering plant families on Earth—over 28,000 species. Many have evolved to attract just one specific pollinator, meaning their beauty is extremely targeted. They don't bloom for everyone, and that's by design.",
    resilienceType: "Environmental Sensitivity",
    resilienceIcon: "🔬",
    resilience: "Your pickiness is precision, not fragility. Orchids partner with specific fungi because they need the right conditions, not any conditions. The challenge isn't to feel less — it's to build an environment that matches how much you feel. You deserve conditions that let you bloom, not just survive."
  },
  bamboo: {
    key: "bamboo", name: "Bamboo", icon: "🎋", core: "Flexible Growth & Leverage", color: "#6cc4a4", accent: "#a0e0c4",
    reflection: "Where can you lean on others or your environment to grow faster?",
    description: "You bend but never break. Like bamboo, you grow fast, adapt quickly, and find creative ways through obstacles. Your flexibility is your superpower—you don't resist change, you ride it. Growth comes easily when you let yourself be supported.",
    habits: ["Ask for mentorship or guidance from someone you admire", "Collaborate on one project instead of going solo", "Try one new approach or method each week", "Say yes to an unexpected opportunity"],
    funFact: "Bamboo is the fastest-growing plant on Earth—some species grow up to 91 cm (35 inches) in a single day. But before that explosive growth, bamboo spends 3–5 years building an underground root network. All that invisible work makes the rapid growth possible.",
    resilienceType: "Structural Resilience",
    resilienceIcon: "🌿",
    resilience: "Flexibility is a form of strength most people never develop. Bamboo's hollow core is what lets it bend 90 degrees without snapping. Your adaptability isn't a lack of conviction — it's proof you've learned how to move through change without losing yourself. And it's okay to be tired of bending. You're allowed to let someone else absorb the wind for a while."
  },
  oak: {
    key: "oak", name: "Oak", icon: "🌳", core: "Steady, Foundational Strength", color: "#a0927a", accent: "#c8bca8",
    reflection: "Which routines or supports anchor you through change?",
    description: "You are the steady presence others rely on. Like an oak, your strength comes from deep roots—consistent habits, strong values, and the patience to grow slowly over time. Storms don't scare you because you know where you stand.",
    habits: ["Deepen one long-term habit that grounds you", "Journal about your core values monthly", "Maintain consistent sleep and exercise patterns", "Build rituals that mark transitions in your day"],
    funFact: "An oak tree's root system can extend two to three times wider than its canopy. A single mature oak can draw up 100 gallons of water per day from the soil—and supports over 2,300 species of insects, birds, and mammals. Steady presence, massive impact.",
    resilienceType: "Structural Resilience",
    resilienceIcon: "🌿",
    resilience: "Your strength comes from roots that spread two to three times wider than what anyone sees above ground. But roots need water too. The danger for you isn't breaking under pressure — it's forgetting to ask for nourishment because you're so used to providing it. You are allowed to be the one who is held. The biggest trees in the forest still need rain."
  },
  fruitTree: {
    key: "fruitTree", name: "Fruit Tree", icon: "🍎", core: "Seasonal & Goal-Oriented", color: "#e8a87c", accent: "#f2c8a8",
    reflection: "What efforts today will produce meaningful results in the future?",
    description: "You think in harvests. Like a fruit tree, you invest effort now knowing it will bear fruit later. You move through clear seasons—planting, nurturing, harvesting, resting. Your patience and goal-orientation create meaningful, tangible results.",
    habits: ["Set one meaningful short-term goal each month", "Track your progress visually—charts, journals, checklists", "Celebrate milestones, even the small ones", "Plan deliberate rest after each harvest season"],
    funFact: "Apple trees need 4–8 years before they produce their first fruit—and they require a cold winter dormancy period (called 'chill hours') to trigger spring blossoming. Without rest, there's no harvest. Nature literally requires downtime before productivity.",
    resilienceType: "Physiological Adaptation",
    resilienceIcon: "💧",
    resilience: "Apple trees literally cannot bloom without a cold winter. The rest period isn't the gap between productive seasons — it's the biological prerequisite for the next harvest. If nothing seems to be growing, your body is doing the invisible work that makes the next season possible. Rest isn't the opposite of progress for you. It is the progress."
  },
  wildflower: {
    key: "wildflower", name: "Wildflower", icon: "🌼", core: "Community & Adaptability", color: "#e8c85c", accent: "#f4e08c",
    reflection: "Who supports your growth, and how can you contribute back?",
    description: "You bloom wherever life plants you. Like a wildflower, your beauty comes from adaptability—you find sunlight in unlikely places and grow in community with others. You lift people up and are lifted in return.",
    habits: ["Join or reconnect with a community group", "Diversify your friendships across contexts", "Offer help to someone who's struggling", "Try growing in a new environment—a class, event, or group"],
    funFact: "Wildflower meadows support 10× more pollinators than manicured lawns. Many wildflower seeds can lie dormant in soil for decades, waiting for the right conditions. They don't just survive disruption—they need it. Fire, storms, and upheaval actually trigger mass blooming.",
    resilienceType: "Community & Ecosystem",
    resilienceIcon: "🤝",
    resilience: "Wildflower meadows are the most biodiverse ecosystems in temperate climates — not because individual flowers are strongest, but because they grow together. Your power has never been about doing it alone. But the generous ones need to hear this: you deserve a meadow that gives back to you. You are not just the gardener. You are also the garden."
  },
  vine: {
    key: "vine", name: "Vine", icon: "🌿", core: "Network-Dependent Growth", color: "#6cc490", accent: "#a0e0b8",
    reflection: "Which supports or structures could you use to reach higher?",
    description: "You grow best when connected. Like a vine, you reach incredible heights when you have the right structure to climb. Your strength isn't about standing alone—it's about knowing how to find, build, and use the scaffolding around you.",
    habits: ["Map your support network—who helps with what?", "Seek one new scaffolding structure (mentor, group, system)", "Collaborate strategically on shared goals", "Practice asking for specific help, not just general support"],
    funFact: "Some tropical vines grow over 200 meters long, making them among the longest organisms on Earth. They achieve this not by building thick trunks, but by strategically using other trees as support. It's a brilliant energy trade-off: invest in connection, not in going it alone.",
    resilienceType: "Community & Ecosystem",
    resilienceIcon: "🤝",
    resilience: "Vines invest all their energy in growth instead of structure, because they're brilliant enough to use the structures around them. Needing people isn't dependency — it's strategy. The smartest systems in nature are networked, not isolated. Your ability to find the right support and grow toward connection isn't a flaw in your design. It is your design."
  },
  moss: {
    key: "moss", name: "Moss", icon: "🌱", core: "Incremental Impact", color: "#88b888", accent: "#b0d8b0",
    reflection: "Which small, daily habits add up over time?",
    description: "You understand that growth doesn't have to be dramatic to be real. Like moss, you spread slowly, softly, and persistently—covering more ground than anyone notices until they step back and see how far you've come.",
    habits: ["Daily journaling, even just one sentence", "Micro-learning: one article, one video, one page a day", "Tiny self-care rituals that compound over time", "Track streaks to see your invisible progress"],
    funFact: "Moss has no roots, stems, or flowers—yet it's been thriving on Earth for over 450 million years, predating every other land plant. It reproduces through spores that can survive extreme heat, cold, and drought. Proof that you don't need to be flashy to be one of the most resilient things alive.",
    resilienceType: "Reproductive & Regenerative",
    resilienceIcon: "🔄",
    resilience: "Moss is 450 million years old. It outlasted every dramatic species that ever overshadowed it — not through explosive growth, but through the quiet accumulation of tiny gains. Every small habit you've built, every day you showed up when it didn't seem to matter, is compounding. You don't need a breakthrough. You are the breakthrough, happening slowly."
  },
  bonsai: {
    key: "bonsai", name: "Bonsai", icon: "🌲", core: "Intentional Shaping", color: "#78b8a0", accent: "#a8d8c4",
    reflection: "Where could you prune distractions and focus intentionally?",
    description: "You value precision and intention. Like a bonsai, your growth is deliberate—you choose where to direct energy and what to prune away. Beauty, for you, comes from refinement rather than size. You create masterpieces through patience and focus.",
    habits: ["Limit multitasking—focus on one thing at a time", "Declutter your space and digital environment", "Choose 1–2 priorities per season, not 10", "Review and prune commitments monthly"],
    funFact: "A bonsai tree is genetically identical to its full-sized counterpart—it's not a dwarf species. The only difference is intentional shaping: careful pruning, wiring, and root management. Some bonsai trees are over 800 years old. Constraint, applied with care, creates extraordinary longevity.",
    resilienceType: "Structural Resilience",
    resilienceIcon: "🌿",
    resilience: "A bonsai is genetically identical to a full-sized tree — it contains everything the giant contains. You haven't limited yourself. You've chosen where to direct an enormous life force into a refined, concentrated form. The discipline to prune, to say no, to cut away what doesn't serve your shape — that's one of the rarest forms of courage."
  },
  mushroom: {
    key: "mushroom", name: "Mushroom", icon: "🍄", core: "Invisible Systems Builder", color: "#8b7355", accent: "#b8a082",
    reflection: "What infrastructure are you building that others don't see?",
    description: "You work underground. Like mycelium, you're the hidden network that connects everything else—building systems, enabling others' growth, creating infrastructure that nobody notices until it's essential. You don't need credit. You need to see the whole system thrive.",
    habits: ["Document processes that only exist in your head", "Connect two people who should know each other", "Build a system that runs without you", "Notice whose work depends on yours"],
    funFact: "Mycelium networks can span thousands of acres—the largest organism on Earth is a honey fungus in Oregon covering 2,385 acres. These networks share nutrients between trees, send chemical warnings about pests, and keep entire forests alive. The trees get the credit. The fungus does the work.",
    resilienceType: "Network Resilience",
    resilienceIcon: "🕸️",
    resilience: "Mycelium survives by being everywhere and nowhere. Cut one connection, and the network routes around it. You're not fragile because you're not centralized. Your power isn't in being seen—it's in being essential. The whole forest depends on what you built, even if they never knew you were there."
  },
  maple: {
    key: "maple", name: "Maple", icon: "🍁", core: "Expressive Transformer", color: "#c75d3a", accent: "#e8945f",
    reflection: "What season of change are you in right now, and how can you let yourself be seen in it?",
    description: "You transform visibly and generously. Like a maple tree, you don't hide your seasons—you announce them in brilliant color. When you change, everyone knows it. And that visibility isn't vanity; it's a gift. Your willingness to be seen in transformation gives others permission to change too. You share your sweetness freely.",
    habits: ["Let people see you during transitions, not just after", "Celebrate your seasons instead of rushing through them", "Share your gifts without waiting until you're 'ready'", "Create beauty that others can enjoy, even in difficult times"],
    funFact: "Maple trees produce sap that's only 2% sugar—it takes 40 gallons of sap to make a single gallon of syrup. The tree spends all year storing energy, then shares it in one generous spring flow. Maples also turn brilliant colors in autumn not because they're dying, but because they're revealing pigments that were there all along, hidden by green chlorophyll.",
    resilienceType: "Seasonal Resilience",
    resilienceIcon: "🔥",
    resilience: "The maple doesn't resist its seasons—it becomes them completely. Brilliant green, then gold, then crimson, then bare. Each phase is total. There's no halfway autumn for a maple. Your power is in your willingness to transform fully and visibly. The colors everyone admires in fall? They were inside the leaves the whole time. Your most radiant self isn't something you become. It's something you finally let show."
  },
  lotus: {
    key: "lotus", name: "Lotus", icon: "🪷", core: "Transformation & Renewal", color: "#d4829c", accent: "#f0b8cc",
    reflection: "What has been your murkiest season—and what did it teach you about who you're becoming?",
    description: "You've been through it. Like a lotus, your roots are anchored in mud—difficult experiences, painful chapters, environments that weren't built for you. But you're rising. The lotus doesn't bloom despite the mud; it blooms because of it. Your hardest seasons are becoming the foundation of something extraordinary.",
    habits: ["Name one thing you've survived that made you stronger", "Write a letter to your past self with compassion", "Identify one area of your life that's actively healing", "Create a small ritual that marks your growth—a weekly reset, a monthly reflection"],
    funFact: "Lotus seeds are the longest-viable seeds ever discovered—scientists have germinated seeds that were over 1,300 years old from a dried-up lake bed in China. The lotus also has a remarkable self-cleaning surface: its leaves are so microscopically textured that mud and water roll right off. Rooted in mud, untouched by it.",
    resilienceType: "Reproductive & Regenerative",
    resilienceIcon: "🔄",
    resilience: "The lotus doesn't just pass through the mud — it builds its entire structure in that darkness. Every root, every stem, every cell of the flower is constructed in the place that felt like drowning. A 1,300-year-old seed was pulled from a dried-up lake bed and it bloomed. You are not too late. You are not too damaged. You are building something, right now, that the surface hasn't seen yet."
  },
};

const habitats = {
  forestFloor: {
    key: "forestFloor", name: "The Forest Floor", icon: "🌲", color: "#6b9e7a", accent: "#a0ccad",
    plants: ["moss", "orchid", "mushroom"],  // quiet, protected, underground networks
    tagline: "Sheltered, layered, and quietly alive",
    description: "The forest floor is one of the most biodiverse places on Earth—but you'd never know it at first glance. Beneath the canopy, light is filtered, noise is muffled, and growth happens in rich, composted layers built up over decades. Nothing is wasted here. Fallen leaves become soil. Shade becomes shelter. Stillness becomes strategy.",
    offers: "Protection from overwhelm, clear boundaries, predictable rhythms, depth over breadth, space to observe before acting",
    watchFor: "Isolation disguised as safety, avoiding sunlight you actually need, staying small because the canopy feels comfortable, mistaking shelter for stagnation",
    realWorld: "Structured workplaces with clear expectations, small friend groups with deep trust, solo creative practice, therapy or mentorship relationships, quiet campuses or studios, routines that protect your energy",
    ecology: "Forest floors recycle 90% of all nutrients in a forest ecosystem. The mycorrhizal fungal networks beneath the soil—sometimes called the 'wood wide web'—allow trees to share resources, send chemical warnings, and even feed their struggling neighbors through underground connections."
  },
  openMeadow: {
    key: "openMeadow", name: "The Open Meadow", icon: "🌾", color: "#d4b84c", accent: "#f0dc8c",
    plants: ["wildflower", "fruitTree", "bonsai"],  // visible, seasonal, cultivated
    tagline: "Bright, social, and seasonally alive",
    description: "The meadow is all sun and open sky—nothing is hidden here. It's where pollinators gather, where colors compete for attention, and where growth is visible and celebrated. Meadows are inherently communal: every flower depends on the insects, birds, and wind around it. Life here moves in clear seasons—blooming, fruiting, going dormant, returning.",
    offers: "Visibility, social energy, clear feedback loops, seasonal structure, collaboration, celebration of progress",
    watchFor: "Burnout from constant exposure, comparison with other blooms, seasonal pressure to always be 'on,' neglecting roots because the surface looks fine, giving more than you receive",
    realWorld: "Collaborative teams with shared goals, creative communities, classrooms and cohort-based programs, social media presence done healthfully, friend groups that celebrate each other, seasonal goal-setting with built-in rest",
    ecology: "Meadows support 10× more pollinator species than any other terrestrial habitat. They're also fire-adapted—many meadow ecosystems depend on periodic burns to clear old growth and trigger mass germination. The most vibrant meadows aren't the ones that were never disturbed. They're the ones that burned and came back stronger."
  },
  riverbank: {
    key: "riverbank", name: "The Riverbank", icon: "🌊", color: "#6aaec4", accent: "#a0d4e4",
    plants: ["lotus", "vine", "bamboo"],  // change, adaptation, transformation
    tagline: "Transitional, fertile, and always moving",
    description: "The riverbank is where land meets water—a place of constant change, rich sediment, and creative chaos. Nothing stays the same here for long. The water rises, recedes, carves new channels, deposits new soil. Plants that thrive on the riverbank are the ones that learned to use instability as fuel. It's messy, fertile, and full of possibility.",
    offers: "Abundance of resources, rapid growth potential, connection to larger systems, constant renewal, exposure to new inputs and ideas",
    watchFor: "Instability masquerading as excitement, difficulty putting down roots, being swept along by others' currents, confusing motion with progress, exhaustion from constant adaptation",
    realWorld: "Startups and fast-moving organizations, transitional life phases (new city, new career, post-breakup), interdisciplinary work that crosses boundaries, mentorship networks, recovery and rebuilding seasons, creative projects with fluid scope",
    ecology: "Riparian zones—the ecosystems along riverbanks—contain only 1% of the land area in arid regions but support over 80% of the biodiversity. The constant flooding deposits nutrient-rich sediment that makes riverbank soil some of the most fertile on Earth."
  },
  rockyRidge: {
    key: "rockyRidge", name: "The Rocky Ridge", icon: "🏔️", color: "#a09080", accent: "#c8b8a8",
    plants: ["succulent", "oak", "maple"],  // stores reserves, endures through seasons
    tagline: "Exposed, enduring, and built to last",
    description: "The ridge is where the wind hits hardest, the soil is thinnest, and the view stretches the farthest. Nothing grows here by accident. Every plant on a ridge has earned its place through deep roots, thick bark, or the ability to store its own reserves. It's not comfortable—but the things that survive here become ancient, massive, and unmovable.",
    offers: "Clarity from elevation, self-reliance, long-term perspective, resilience tested by real conditions, freedom from clutter and noise",
    watchFor: "Romanticizing hardship, refusing help because you've survived without it, emotional exposure without shelter, exhaustion mistaken for toughness, loneliness framed as independence",
    realWorld: "Independent work or entrepreneurship, leadership roles with high accountability, long-term academic or creative pursuits, solo travel or relocation, caregiving roles, building something from nothing, environments where you set your own pace",
    ecology: "Bristlecone pines on exposed ridges in the White Mountains of California are the oldest known living organisms on Earth—over 5,000 years old. They grow so slowly that their wood is incredibly dense, making them virtually immune to rot, insects, and disease."
  },
};

const seasons = {
  spring: {
    key: "spring", name: "Spring", icon: "🌱", color: "#7ec8a0", accent: "#b8e6cc",
    tagline: "Growth & Exploration",
    signs: "High curiosity, energy for new projects, openness to change, restlessness, desire to start fresh, ideas coming faster than you can act on them",
    reflections: ["What new skill, relationship, or habit could I plant right now?", "Where can I take small risks to see what grows?"],
    habits: ["Journaling to capture new ideas", "Exploring a hobby or interest without pressure", "Reaching out to someone new", "Starting one small project you've been thinking about"]
  },
  summer: {
    key: "summer", name: "Summer", icon: "☀️", color: "#e8c44c", accent: "#f4dc84",
    tagline: "Flourishing & Action",
    signs: "High energy, momentum, visible progress, feeling capable, taking on challenges, saying yes to things, wanting to be seen and recognized",
    reflections: ["What am I building right now that I'm proud of?", "Am I resting enough to sustain this pace?"],
    habits: ["Taking on a stretch project", "Sharing your work publicly", "Mentoring or helping others", "Scheduling rest before you need it"]
  },
  autumn: {
    key: "autumn", name: "Autumn", icon: "🍂", color: "#e8a87c", accent: "#f2c8a8",
    tagline: "Reflection & Harvest",
    signs: "Slowing down, finishing projects, feeling reflective, wanting to simplify, noticing what worked and what didn't, gratitude mixed with letting go",
    reflections: ["What did I build this year that I want to keep?", "What's no longer serving me that I can release?"],
    habits: ["Reviewing goals and progress", "Celebrating wins (even small ones)", "Clearing out commitments", "Having closure conversations"]
  },
  winter: {
    key: "winter", name: "Winter", icon: "❄️", color: "#8cacc4", accent: "#b8d0e0",
    tagline: "Rest & Renewal",
    signs: "Low energy, desire for solitude, less motivation, introspection, feeling quiet, preferring familiar routines over new adventures",
    reflections: ["What does real rest look like for me right now?", "What am I protecting my energy for?"],
    habits: ["Saying no to non-essential commitments", "Prioritizing sleep and recovery", "Spending time with a small circle", "Doing low-stakes creative activities"]
  },
};

const plantSeasons = {
  succulent: { peakSeason: "summer", spring: "Spring stirs slowly for you. After conserving through winter, you begin cautiously opening.", summer: "This is your power season. Your reserves are full, the conditions are right.", autumn: "You start pulling inward, assessing what needs to stay and what can be shed.", winter: "Winter is your native element. While others struggle with dormancy, you're built for it." },
  orchid: { peakSeason: "spring", spring: "This is your season of bloom. When conditions align, you produce something breathtaking.", summer: "High summer can overwhelm you. The intensity and demand to be 'on' is a lot.", autumn: "Autumn's gentler light suits you. The world quiets down.", winter: "Winter asks you to go dormant, and that can feel scary." },
  bamboo: { peakSeason: "spring", spring: "This is your explosive season. Bamboo shoots can grow 35 inches in a single day.", summer: "You're at full height, swaying with the wind, leveraging your flexibility.", autumn: "Growth slows, but your underground rhizome network strengthens.", winter: "Winter dormancy feels counterintuitive, but your root network expands in cold months." },
  oak: { peakSeason: "summer", spring: "You leaf out slowly—later than most trees. Oaks are cautious in spring.", summer: "Full canopy, maximum photosynthesis. 100 gallons of water drawn daily.", autumn: "You produce acorns—thousands of them. Autumn is your harvest season.", winter: "Oaks stand through winter with their structure fully intact—bare but unbroken." },
  fruitTree: { peakSeason: "autumn", spring: "Blossoms everywhere—this is when your invested effort becomes visible.", summer: "The fruit is forming but not yet ripe. Sustained, patient nurturing.", autumn: "This is your defining season. The harvest. Everything you waited for is ready.", winter: "Your chill hours. Fruit trees literally cannot bloom without a cold dormancy period." },
  wildflower: { peakSeason: "summer", spring: "Seeds are germinating, the meadow is waking up.", summer: "Peak bloom. The meadow is alive with color, pollinators, and energy.", autumn: "Seeds scatter. Your influence spreads beyond the immediate meadow.", winter: "The meadow goes quiet. For someone who thrives on social energy, that can feel like loss." },
  vine: { peakSeason: "spring", spring: "Your tendrils are reaching, searching for the next structure to climb.", summer: "You're climbing at full speed, reaching heights standalone plants can't touch.", autumn: "Growth slows and you begin consolidating your position.", winter: "Dormancy can feel threatening when your growth depends on external structures." },
  moss: { peakSeason: "autumn", spring: "While other plants sprint toward sunlight, you spread at your own pace.", summer: "Summer can be hard on you. Moss dries out in direct heat.", autumn: "This is your comfort zone. The dampness, the cooling air.", winter: "Moss doesn't go fully dormant. You keep photosynthesizing when others have stopped." },
  bonsai: { peakSeason: "spring", spring: "New buds appear on old wood—and you get to decide which ones to keep.", summer: "Full foliage within your chosen form. Constraints create visible beauty.", autumn: "Bonsai in autumn color are among the most stunning things in horticulture.", winter: "Deciduous bonsai lose their leaves, revealing the branch structure underneath." },
  mushroom: { peakSeason: "autumn", spring: "The network is expanding underground—new connections forming where nobody can see them yet.", summer: "You're quietly supporting everything above ground. The forest is thriving because of work only you know about.", autumn: "Your defining season. This is when the fruiting bodies appear—finally, visible proof of everything you've built.", winter: "The surface goes quiet, but underground the network stays active, slowly expanding even in the cold." },
  maple: { peakSeason: "autumn", spring: "The sap is running—all that stored sweetness is finally flowing. This is your season of generous giving after quiet accumulation.", summer: "Full canopy, providing shade for everyone beneath you. Your presence is a gift even when you're not actively transforming.", autumn: "Your defining season. The colors you reveal now were inside you all along. This is when your transformation becomes visible to everyone.", winter: "Bare branches, but not empty. The structure that holds everything is finally visible. Rest and root-building happen here." },
  lotus: { peakSeason: "summer", spring: "Stems push through murky water toward a surface they can't see yet.", summer: "You break the surface and bloom. Your flower opens above it all.", autumn: "The bloom softens and the seed pod forms.", winter: "The lotus pulls back beneath the water, invisible again. But the rhizome is alive." },
};

const plantToHabitat = {};
Object.values(habitats).forEach((h) => { h.plants.forEach((p) => { plantToHabitat[p] = h.key; }); });

const semLevels = [
  {
    key: "individual",
    name: "Individual",
    icon: "🌱",
    color: "#a0927a",
    vitalityKey: "roots",
    description: "Your biology, psychology, and personal history. Sleep, physical health, energy levels, coping skills, and the habits you've built over time.",
    questions: "Questions 1, 6, 7, 9, 10 tap into this level—how you take care of yourself, handle stress, and manage your energy.",
    examples: "Sleep quality, exercise habits, emotional regulation, personal resilience, health conditions, learned coping mechanisms."
  },
  {
    key: "interpersonal",
    name: "Interpersonal",
    icon: "🐝",
    color: "#c490b8",
    vitalityKey: "pollination",
    description: "Your close relationships—family, friends, partners, roommates. The people who directly affect your daily life and emotional state.",
    questions: "Questions 2, 5, 8 explore this level—your support system, who shows up for you, and how you navigate relationships.",
    examples: "Quality of friendships, family dynamics, romantic relationships, living situation, people you can call at 2am."
  },
  {
    key: "organizational",
    name: "Organizational",
    icon: "☀️",
    color: "#e8c44c",
    vitalityKey: "sunlight",
    description: "The institutions you're part of—school, work, religious communities, clubs. Places with structures, expectations, and cultures that shape your daily experience.",
    questions: "Questions 3, 12 touch on this—how you recharge, seasonal patterns, and how organizations affect your rhythms.",
    examples: "Workplace culture, school environment, team dynamics, organizational support, institutional flexibility."
  },
  {
    key: "community",
    name: "Community",
    icon: "💧",
    color: "#6aadcc",
    vitalityKey: "water",
    description: "Your broader environment—neighborhood, city, social networks, online communities. The opportunities and resources available where you live.",
    questions: "Questions 4, 11, 13, 14 explore access to opportunities, resources, and the broader environment you're navigating.",
    examples: "Neighborhood safety, access to healthcare, public transportation, community resources, local economy, social capital."
  },
  {
    key: "policy",
    name: "Policy & Culture",
    icon: "🪴",
    color: "#88b888",
    vitalityKey: "soil",
    description: "The largest systems—laws, cultural norms, economic conditions, political climate. Forces that affect everyone but are mostly outside individual control.",
    questions: "Question 15 directly addresses scarcity and systemic constraints. Many questions indirectly reflect policy-level factors.",
    examples: "Cost of living, healthcare policy, discrimination, cultural expectations, economic conditions, social safety nets."
  },
];

const plantCategories = [
  { name: "Self-Reliant & Enduring", plants: ["succulent", "oak", "maple"], description: "Plants that store internal reserves and thrive through their seasons" },
  { name: "Sensitive & Attuned", plants: ["orchid", "lotus", "moss"], description: "Plants that respond deeply to their environment and need the right conditions" },
  { name: "Adaptive & Connected", plants: ["bamboo", "wildflower", "vine"], description: "Plants that grow through flexibility, community, and creative adaptation" },
  { name: "Intentional & Generative", plants: ["bonsai", "mushroom", "fruitTree"], description: "Plants that grow deliberately, build systems, and create for others" },
];

const getResult = (answers) => {
  const totals = {};
  Object.keys(plantProfiles).forEach((k) => (totals[k] = 0));
  Object.values(answers).forEach((scores) => {
    if (scores && typeof scores === "object") {
      Object.entries(scores).forEach(([plant, pts]) => {
        if (totals[plant] !== undefined) totals[plant] += pts;
      });
    }
  });
  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const primaryKey = sorted[0][0];
  const habitat = habitats[plantToHabitat[primaryKey]];
  return { primary: plantProfiles[primaryKey], secondary: plantProfiles[sorted[1][0]], tertiary: plantProfiles[sorted[2][0]], scores: totals, sorted, habitat };
};

const vitalityDimensions = [
  {
    key: "roots", label: "Roots", icon: "🌱", question: 0, color: "#a0927a",
    description: "Your roots represent the daily habits that anchor everything else—sleep, nutrition, movement, and rest. Just like a plant's root system determines how well it can absorb water and nutrients, your foundational routines determine how much energy and resilience you have for everything else in your life.",
    thriving: "Your roots are deep and strong. Your daily habits are genuinely supporting your energy, which means you have a stable base to weather storms and pursue growth. Keep nourishing these foundations—they're your superpower.",
    growing: "Your roots are developing but not fully established. Some habits are working, others slip when life gets busy. There's a foundation here—it just needs more consistency to really anchor you.",
    needsCare: "Your roots are shallow right now. Sleep, food, movement, or rest aren't getting the attention they need, and it's affecting everything else. Even small improvements here will ripple outward.",
    dormant: "Your roots are struggling. The basics have fallen away, and you're running on fumes. This isn't sustainable, and it's not your fault—but it does need attention. Start with one small thing."
  },
  {
    key: "soil", label: "Soil", icon: "🪴", question: 1, color: "#88b888",
    description: "Your soil is the environment you're planted in—your home, workplace, neighborhood, and the systems around you. Good soil provides nutrients and stability. Poor soil makes everything harder, no matter how strong the plant. Sometimes the problem isn't you; it's where you're planted.",
    thriving: "You're in good soil. Your environment is actively supporting your growth—stable housing, manageable work, people who help more than they drain. This is a real advantage. Use it well.",
    growing: "Your soil is mixed. Some parts of your environment support you; others make things harder. You're managing, but you might be growing despite your conditions rather than because of them.",
    needsCare: "Your soil is depleted. Your environment—whether it's living situation, work, or the people around you—is draining more than it's giving. Growth here requires extra effort that others don't have to spend.",
    dormant: "You're planted in rocky ground. Your environment feels actively difficult—unstable, unsupportive, or even hostile. Just surviving takes most of your energy. You deserve better soil."
  },
  {
    key: "sunlight", label: "Sunlight", icon: "☀️", question: 2, color: "#e8c44c",
    description: "Sunlight represents the things that actually recharge you—rest, hobbies, downtime, joy. Plants convert sunlight into energy through photosynthesis. You convert rest and enjoyment into the fuel you need to function. Without it, everything slows down.",
    thriving: "You're getting plenty of light. You know what recharges you and you actually make time for it. This isn't selfish—it's how you generate the energy to show up for everything else.",
    growing: "You're catching some light, but not consistently. You know what fills you up, but it gets squeezed out by other demands. There's room to be more intentional about protecting this time.",
    needsCare: "You're in the shade. Self-care has become an afterthought, and you're running on obligation rather than genuine energy. The things that used to recharge you have been crowded out.",
    dormant: "You're in the dark. Rest feels impossible, hobbies feel pointless, and you've lost touch with what even fills you up anymore. You're depleted, and it shows. Finding any source of light is the priority."
  },
  {
    key: "water", label: "Water", icon: "💧", question: 3, color: "#6aadcc",
    description: "Water represents access—to opportunities, resources, guidance, and pathways forward. Some people have rivers flowing to them; others are in a drought. This isn't about effort or merit. It's about what's actually available to you.",
    thriving: "Water is flowing to you. Opportunities, mentors, resources, open doors—you have access to what you need to grow. This is a privilege worth recognizing and using intentionally.",
    growing: "Some streams reach you, others don't. You have access to some opportunities but not others. Growth is possible, but it requires more effort to find and reach the water you need.",
    needsCare: "Water is scarce. Opportunities feel limited, resources are tight, and pathways forward aren't obvious. You're not imagining it—the drought is real, and it's not your fault.",
    dormant: "You're in a drought. Access to opportunities, guidance, and resources has dried up. It's hard to grow when there's nothing to grow with. Finding even a trickle of water is the priority."
  },
  {
    key: "pollination", label: "Pollination", icon: "🐝", question: 4, color: "#c490b8",
    description: "Pollination is connection—the relationships that help you grow, reproduce ideas, and feel part of something larger. Plants need pollinators to thrive. So do people. This isn't about popularity; it's about having people who actually show up.",
    thriving: "Your garden is buzzing. You have real connections—people who show up, check in, and make you feel less alone. This is one of the strongest predictors of wellbeing. Protect these relationships.",
    growing: "You have some trusted connections, even if your circle is small. Quality matters more than quantity. The relationships you have are real—you might just want a few more of them.",
    needsCare: "Connection is sparse. You don't have many people you can really count on, and loneliness is a familiar feeling. This isn't a character flaw—it's a need that's not being met.",
    dormant: "You feel alone. Whether by circumstance or self-protection, meaningful connection is missing. Humans aren't meant to do this solo. Finding even one real connection would change things."
  },
];

export default function PlantWellnessQuiz() {
  const [stage, setStage] = useState("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);
  const [resultRevealed, setResultRevealed] = useState(false);
  const [chosenIndices, setChosenIndices] = useState({});
  const [expandedBars, setExpandedBars] = useState({});
  const [expandedSeason, setExpandedSeason] = useState(null);
  const [shareToast, setShareToast] = useState(false);
  const [expandedPlant, setExpandedPlant] = useState(null);
  const [expandedHabitat, setExpandedHabitat] = useState(null);
  const [expandedEncSeason, setExpandedEncSeason] = useState(null);
  const [prevStage, setPrevStage] = useState("intro");
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState(null); // null, "sending", "sent", "error"
  const [emailConsent, setEmailConsent] = useState(false);
  const resultsRef = useRef(null);

  const goToPage = (page) => { setPrevStage(stage); setStage(page); };
  const goBack = () => setStage(prevStage);

  // Check URL for shared results on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedResults = params.get('r');
    if (encodedResults) {
      try {
        const decoded = JSON.parse(atob(encodedResults));
        if (decoded.indices && typeof decoded.indices === 'object') {
          // Reconstruct answers from indices
          const reconstructedAnswers = {};
          Object.entries(decoded.indices).forEach(([qIndex, optionIndex]) => {
            const q = questions[parseInt(qIndex)];
            if (q && q.options[optionIndex]) {
              reconstructedAnswers[qIndex] = q.options[optionIndex].scores;
            }
          });
          setChosenIndices(decoded.indices);
          setAnswers(reconstructedAnswers);
          setStage("results");
        }
      } catch (e) {
        console.error("Failed to decode results from URL");
      }
    }
  }, []);

  // Generate shareable results URL
  const getShareableResultsUrl = () => {
    const encoded = btoa(JSON.stringify({ indices: chosenIndices }));
    return `${window.location.origin}${window.location.pathname}?r=${encoded}`;
  };

  useEffect(() => { setFadeIn(false); const t = setTimeout(() => setFadeIn(true), 60); return () => clearTimeout(t); }, [currentQ, stage]);
  useEffect(() => { if (stage === "results") { const t = setTimeout(() => setResultRevealed(true), 500); return () => clearTimeout(t); } setResultRevealed(false); }, [stage]);

  const handleSelect = (scores, idx) => {
    setSelectedOption(idx);
    setTimeout(() => {
      setAnswers((prev) => ({ ...prev, [currentQ]: scores }));
      setChosenIndices((prev) => ({ ...prev, [currentQ]: idx }));
      setSelectedOption(null);
      if (currentQ < questions.length - 1) setCurrentQ((p) => p + 1);
      else setStage("results");
    }, 350);
  };

  const restart = () => { setStage("intro"); setCurrentQ(0); setAnswers({}); setSelectedOption(null); setChosenIndices({}); setExpandedBars({}); setExpandedSeason(null); };

  const result = stage === "results" ? getResult(answers) : null;
  const progress = ((currentQ + 1) / questions.length) * 100;
  const maxScore = result ? result.sorted[0][1] : 0;

  const getVitalityScore = (qIndex) => { const idx = chosenIndices[qIndex]; if (idx === undefined) return 0; const n = questions[qIndex].options.length; return Math.round(((n - 1 - idx) / (n - 1)) * 100); };
  const vitalityScores = vitalityDimensions.map((d) => ({ ...d, score: getVitalityScore(d.question) }));
  const overallVitality = vitalityScores.length ? Math.round(vitalityScores.reduce((s, d) => s + d.score, 0) / vitalityScores.length) : 0;


  const getHealthLabel = (s) => { if (s >= 80) return "Thriving"; if (s >= 55) return "Growing"; if (s >= 30) return "Needs care"; return "Dormant"; };
  const getHealthColor = (s) => { if (s >= 80) return "#6cc4a4"; if (s >= 55) return "#e8c44c"; if (s >= 30) return "#e8a87c"; return "#c490b8"; };
  const getScoreDescription = (dim, score) => { if (score >= 80) return dim.thriving; if (score >= 55) return dim.growing; if (score >= 30) return dim.needsCare; return dim.dormant; };

  const handleShare = async () => {
    const resultsUrl = getShareableResultsUrl();
    const quizUrl = window.location.origin + window.location.pathname;
    const text = `I just discovered I'm a ${result.primary.name}!\n\n${result.primary.core} — ${result.primary.description.slice(0, 120)}...\n\nSee my full results: ${resultsUrl}\n\nTake the Plant Wellness Quiz and find out what plant matches your wellness style: ${quizUrl}`;
    if (navigator.share) { try { await navigator.share({ title: `I'm a ${result.primary.name}!`, text, url: quizUrl }); } catch {} }
    else { try { await navigator.clipboard.writeText(text); setShareToast(true); setTimeout(() => setShareToast(false), 2500); } catch {} }
  };

  const generatePDF = async () => {
    if (!resultsRef.current) return null;

    // Capture at moderate resolution for balance of quality and size
    const canvas = await html2canvas(resultsRef.current, {
      scale: 1.5,
      useCORS: true,
      backgroundColor: "#f7f5f0",
      logging: false,
      windowWidth: 600,
    });

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const margin = 8;
    const contentWidth = pdfWidth - (margin * 2);

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = contentWidth / imgWidth;
    const scaledHeight = imgHeight * ratio;

    let heightLeft = scaledHeight;
    let srcY = 0;
    const pageContentHeight = pdfHeight - (margin * 2);

    while (heightLeft > 0) {
      if (srcY > 0) {
        pdf.addPage();
      }

      const sliceHeight = Math.min(pageContentHeight / ratio, imgHeight - srcY);

      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = imgWidth;
      tempCanvas.height = sliceHeight;
      const ctx = tempCanvas.getContext("2d");
      ctx.drawImage(canvas, 0, srcY, imgWidth, sliceHeight, 0, 0, imgWidth, sliceHeight);

      // Use JPEG with 0.7 quality for smaller file size
      const sliceData = tempCanvas.toDataURL("image/jpeg", 0.7);
      pdf.addImage(sliceData, "JPEG", margin, margin, contentWidth, sliceHeight * ratio);

      srcY += sliceHeight;
      heightLeft -= pageContentHeight;
    }

    return pdf;
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setEmailStatus("sending");

    try {
      // Send email via EmailJS
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_ikct7co",
          template_id: "template_95bru4a",
          user_id: "w8wRJKPqXMYhtwIhA",
          template_params: {
            to_email: email,
            plant_name: result.primary.name,
            plant_icon: result.primary.icon,
            plant_core: result.primary.core,
            plant_description: result.primary.description,
            habitat_name: result.habitat.name,
            habitat_icon: result.habitat.icon,
            reflection: result.primary.reflection,
            vitality: overallVitality,
            results_link: getShareableResultsUrl(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setEmailStatus("sent");
      setEmail("");
      setEmailConsent(false);
      setTimeout(() => setEmailStatus(null), 5000);
    } catch (err) {
      console.error("Email error:", err);
      setEmailStatus("error");
      setTimeout(() => setEmailStatus(null), 4000);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f5f0", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', sans-serif; }
        html, body { overflow-x: hidden; }
        .wrap { max-width: 640px; margin: 0 auto; padding: 48px 24px 80px; position: relative; z-index: 2; }
        .fade { opacity: 0; transform: translateY(20px); transition: all 0.5s ease; }
        .fade.on { opacity: 1; transform: translateY(0); }
        .badge { display: inline-block; background: rgba(74,168,124,0.1); color: #3d9b78; padding: 6px 14px; border-radius: 100px; font-size: 0.72rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 24px; }
        .title { font-size: 2.4rem; font-weight: 700; color: #2a2a2a; line-height: 1.15; margin-bottom: 16px; }
        .title span { color: #3d9b78; }
        .sub { font-size: 1rem; color: rgba(30,30,30,0.55); line-height: 1.7; margin-bottom: 32px; }
        .btn { background: #4aa87c; color: white; border: none; padding: 16px 36px; border-radius: 100px; font-size: 0.95rem; font-weight: 600; cursor: pointer; transition: all 0.3s; }
        .btn:hover { background: #3d9b78; transform: translateY(-2px); }
        .prog { display: flex; align-items: center; gap: 14px; margin-bottom: 32px; }
        .prog-track { flex: 1; height: 4px; background: rgba(0,0,0,0.06); border-radius: 4px; overflow: hidden; }
        .prog-fill { height: 100%; background: linear-gradient(90deg, #4aa87c, #5a9db8); transition: width 0.5s; }
        .prog-label { font-size: 0.72rem; color: rgba(30,30,30,0.6); }
        .q-tag { display: inline-block; background: rgba(74,168,124,0.08); color: #3d9b78; padding: 4px 12px; border-radius: 100px; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 16px; }
        .q-text { font-size: 1.25rem; color: #2a2a2a; line-height: 1.5; margin-bottom: 28px; }
        .opt { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.08); padding: 16px 20px; border-radius: 16px; margin-bottom: 10px; cursor: pointer; transition: all 0.25s; font-size: 0.92rem; color: rgba(30,30,30,0.85); }
        .opt:hover { background: rgba(74,168,124,0.06); border-color: rgba(108,196,164,0.2); transform: translateX(4px); }
        .opt.sel { background: rgba(74,168,124,0.1); border-color: #3d9b78; transform: scale(0.98); }
        .opt-emo { font-size: 1.2rem; width: 32px; text-align: center; flex-shrink: 0; }
        .back { background: none; border: none; color: rgba(30,30,30,0.55); font-size: 0.82rem; cursor: pointer; margin-top: 16px; padding: 6px 0; }
        .back:hover { color: rgba(30,30,30,0.6); }
        .glass { background: #ffffff; border-radius: 24px; padding: 32px 28px; margin-bottom: 20px; position: relative; box-shadow: 0 2px 16px rgba(0,0,0,0.04); }
        .glass-accent { display: none; }
        .res-icon { font-size: 3rem; margin-bottom: 16px; display: block; }
        .res-you { font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.14em; margin-bottom: 4px; }
        .res-name { font-size: 2rem; font-weight: 700; color: #2a2a2a; margin-bottom: 4px; }
        .res-core { font-size: 0.82rem; margin-bottom: 16px; }
        .res-desc { font-size: 0.9rem; color: rgba(30,30,30,0.7); line-height: 1.75; margin-bottom: 20px; }
        .fun-fact { display: flex; gap: 12px; padding: 16px; border-radius: 14px; background: rgba(0,0,0,0.02); margin-bottom: 20px; }
        .fun-fact-icon { font-size: 1.2rem; flex-shrink: 0; }
        .fun-fact-label { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
        .fun-fact-text { font-size: 0.82rem; color: rgba(30,30,30,0.55); line-height: 1.65; }
        .reflect { padding: 16px 20px; border-radius: 14px; margin-bottom: 20px; }
        .reflect-label { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 6px; }
        .reflect-text { font-size: 1rem; font-weight: 500; color: #2a2a2a; line-height: 1.45; }
        .hab { display: flex; align-items: flex-start; gap: 10px; padding: 8px 0; }
        .hab-dot { width: 5px; height: 5px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
        .hab-text { font-size: 0.86rem; color: rgba(30,30,30,0.6); line-height: 1.5; }
        .resilience-box { margin-top: 24px; padding: 20px; border-radius: 16px; background: rgba(0,0,0,0.02); }
        .resilience-header { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .resilience-icon { font-size: 1rem; }
        .resilience-title { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
        .resilience-badge { font-size: 0.55rem; font-weight: 600; padding: 2px 8px; border-radius: 100px; text-transform: uppercase; margin-left: auto; }
        .resilience-text { font-size: 0.86rem; color: rgba(30,30,30,0.6); line-height: 1.75; }
        .habitat-card { border-radius: 24px; overflow: hidden; margin-bottom: 20px; background: #ffffff; box-shadow: 0 2px 16px rgba(0,0,0,0.04); }
        .habitat-banner { padding: 24px; position: relative; }
        .habitat-eyebrow { font-size: 0.55rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 8px; }
        .habitat-name { font-size: 1.4rem; font-weight: 700; color: #2a2a2a; margin-bottom: 4px; }
        .habitat-tagline { font-size: 0.78rem; color: rgba(30,30,30,0.65); }
        .habitat-body { padding: 0 24px 24px; }
        .habitat-desc { font-size: 0.86rem; color: rgba(30,30,30,0.6); line-height: 1.75; padding-top: 16px; }
        .habitat-section { font-size: 0.55rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 20px; margin-bottom: 8px; }
        .habitat-detail { font-size: 0.82rem; color: rgba(30,30,30,0.55); line-height: 1.65; }
        .habitat-callout { padding: 12px 14px; border-radius: 10px; margin-top: 8px; }
        .habitat-companions { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 8px; }
        .habitat-companion { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 100px; background: rgba(0,0,0,0.03); font-size: 0.74rem; font-weight: 500; color: rgba(30,30,30,0.55); }
        .habitat-companion.you { background: rgba(74,168,124,0.1); color: rgba(30,30,30,0.7); }
        .season-card { background: rgba(0,0,0,0.015); border-radius: 16px; padding: 16px 18px; margin-bottom: 10px; cursor: pointer; transition: all 0.25s; }
        .season-card:hover { background: rgba(0,0,0,0.03); }
        .season-card.active { background: rgba(74,168,124,0.06); }
        .season-header { display: flex; align-items: center; gap: 10px; }
        .season-icon { font-size: 1.3rem; }
        .season-info { flex: 1; }
        .season-name { font-size: 0.9rem; font-weight: 600; color: rgba(30,30,30,0.85); }
        .season-tagline { font-size: 0.72rem; color: rgba(30,30,30,0.6); }
        .season-peak { font-size: 0.55rem; font-weight: 600; padding: 2px 8px; border-radius: 100px; text-transform: uppercase; }
        .season-chev { color: rgba(30,30,30,0.5); transition: transform 0.3s; }
        .season-chev.open { transform: rotate(180deg); }
        .season-expand { max-height: 0; overflow: hidden; opacity: 0; transition: all 0.4s ease; }
        .season-expand.open { max-height: 800px; opacity: 1; padding-top: 14px; }
        .season-detail { font-size: 0.82rem; color: rgba(30,30,30,0.55); line-height: 1.7; }
        .vit-title { font-size: 1.3rem; font-weight: 600; color: #2a2a2a; margin-bottom: 4px; }
        .vit-sub { font-size: 0.8rem; color: rgba(30,30,30,0.65); margin-bottom: 20px; }
        .vit-overall { display: flex; align-items: center; gap: 16px; padding: 16px 20px; background: rgba(0,0,0,0.02); border-radius: 16px; margin-bottom: 20px; }
        .vit-ov-icon { font-size: 1.8rem; }
        .vit-ov-label { font-size: 0.6rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(30,30,30,0.6); margin-bottom: 4px; }
        .vit-ov-row { display: flex; align-items: baseline; gap: 8px; }
        .vit-ov-score { font-size: 1.6rem; font-weight: 700; }
        .vit-ov-status { font-size: 0.78rem; font-weight: 500; }
        .vit-ov-track { height: 4px; background: rgba(0,0,0,0.04); border-radius: 4px; overflow: hidden; margin-top: 10px; }
        .vit-ov-fill { height: 100%; border-radius: 4px; transition: width 1s ease 0.3s; }
        .vit-row { display: flex; align-items: center; gap: 12px; padding: 14px 12px; border-radius: 14px; cursor: pointer; transition: background 0.2s; }
        .vit-row:hover { background: rgba(0,0,0,0.02); }
        .vit-icon { font-size: 1.2rem; width: 28px; text-align: center; flex-shrink: 0; }
        .vit-info { flex: 1; min-width: 0; }
        .vit-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 3px; }
        .vit-name { font-size: 0.88rem; font-weight: 500; color: rgba(30,30,30,0.9); }
        .vit-badge { font-size: 0.6rem; font-weight: 600; padding: 2px 10px; border-radius: 100px; text-transform: uppercase; }
        .vit-tip { font-size: 0.72rem; color: rgba(30,30,30,0.55); margin-bottom: 6px; }
        .vit-track { height: 6px; background: rgba(0,0,0,0.04); border-radius: 6px; overflow: hidden; }
        .vit-fill { height: 100%; border-radius: 6px; transition: width 1.2s ease; }
        .vit-chev { color: rgba(30,30,30,0.55); flex-shrink: 0; transition: transform 0.35s; }
        .vit-chev.open { transform: rotate(180deg); }
        .vit-expand { max-height: 0; overflow: hidden; opacity: 0; transition: all 0.4s ease; padding: 0 12px 0 52px; }
        .vit-expand.open { max-height: 500px; opacity: 1; padding: 0 12px 16px 52px; }
        .vit-insight { font-size: 0.84rem; line-height: 1.65; padding: 14px 18px; border-radius: 12px; color: rgba(30,30,30,0.7); }
        .vit-sep { height: 1px; background: rgba(0,0,0,0.02); margin: 0 12px; }
        .spec-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
        .spec-name { font-size: 0.74rem; color: rgba(30,30,30,0.65); width: 76px; text-align: right; flex-shrink: 0; }
        .spec-track { flex: 1; height: 6px; background: rgba(0,0,0,0.03); border-radius: 6px; overflow: hidden; }
        .spec-fill { height: 100%; border-radius: 6px; transition: width 1.2s ease; }
        .spec-icon { font-size: 0.9rem; width: 22px; text-align: center; }
        .sec-label { font-size: 0.62rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: rgba(30,30,30,0.55); margin: 24px 0 14px; }
        .sec-card { background: rgba(0,0,0,0.015); border-radius: 18px; padding: 20px 24px; margin-bottom: 12px; }
        .sec-head { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; }
        .sec-ico { font-size: 1.5rem; }
        .sec-name { font-size: 1.1rem; font-weight: 600; color: #2a2a2a; }
        .sec-core { font-size: 0.76rem; color: rgba(30,30,30,0.65); margin-bottom: 6px; }
        .sec-desc { font-size: 0.84rem; color: rgba(30,30,30,0.55); line-height: 1.6; }
        .btn-again { background: transparent; color: rgba(30,30,30,0.65); border: 1px solid rgba(0,0,0,0.08); padding: 14px 32px; border-radius: 100px; font-size: 0.88rem; cursor: pointer; transition: all 0.3s; margin-right: 10px; }
        .btn-again:hover { border-color: #3d9b78; color: #3d9b78; }
        .btn-share { background: linear-gradient(135deg, #4aa87c, #3d9b78); color: white; border: none; padding: 14px 28px; border-radius: 100px; font-size: 0.88rem; font-weight: 600; cursor: pointer; transition: all 0.3s; display: inline-flex; align-items: center; gap: 8px; }
        .btn-share:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(74,168,124,0.2); }
        .share-toast { position: fixed; bottom: 32px; left: 50%; transform: translateX(-50%); background: white; color: #3d9b78; border: 1px solid rgba(74,168,124,0.25); padding: 14px 28px; border-radius: 100px; font-size: 0.84rem; font-weight: 500; z-index: 1000; box-shadow: 0 8px 32px rgba(0,0,0,0.08); animation: toastIn 0.3s ease; }
        @keyframes toastIn { from { opacity: 0; transform: translateX(-50%) translateY(12px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }
        .closing { text-align: center; margin-top: 36px; font-size: 0.78rem; color: rgba(30,30,30,0.55); line-height: 1.65; }
        .enc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 16px; }
        .enc-card { background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.06); border-radius: 14px; padding: 14px 12px; text-align: center; cursor: pointer; transition: all 0.25s; }
        .enc-card:hover { background: rgba(0,0,0,0.04); transform: translateY(-2px); }
        .enc-card.you { border-color: rgba(74,168,124,0.4); background: rgba(74,168,124,0.05); }
        .enc-icon { font-size: 1.6rem; margin-bottom: 6px; display: block; }
        .enc-name { font-size: 0.72rem; font-weight: 600; color: rgba(30,30,30,0.8); }
        .enc-core { font-size: 0.62rem; color: rgba(30,30,30,0.6); margin-top: 2px; line-height: 1.3; }
        .enc-cat { margin-top: 20px; }
        .enc-cat-name { font-size: 0.65rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(30,30,30,0.55); margin-bottom: 4px; }
        .enc-cat-desc { font-size: 0.76rem; color: rgba(30,30,30,0.65); margin-bottom: 10px; }
        .plant-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: transparent; z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
        .plant-modal.open { opacity: 1; pointer-events: auto; background: rgba(0,0,0,0.05); }
        .plant-modal-content { background: white; border-radius: 24px; max-width: 500px; width: 100%; max-height: 85vh; overflow-y: auto; position: relative; box-shadow: 0 25px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08); }
        .plant-modal-close { position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.05); border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; z-index: 10; }
        .plant-modal-header { padding: 28px 24px 20px; text-align: center; }
        .plant-modal-icon { font-size: 3rem; margin-bottom: 8px; }
        .plant-modal-name { font-size: 1.5rem; font-weight: 700; color: #2a2a2a; }
        .plant-modal-core { font-size: 0.82rem; margin-top: 4px; }
        .plant-modal-body { padding: 0 24px 28px; }
        .plant-modal-desc { font-size: 0.88rem; color: rgba(30,30,30,0.7); line-height: 1.7; margin-bottom: 20px; }
        .plant-modal-section { font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 18px; margin-bottom: 8px; }
        .plant-modal-fact { font-size: 0.82rem; color: rgba(30,30,30,0.55); line-height: 1.65; padding: 12px 14px; background: rgba(0,0,0,0.02); border-radius: 10px; }
        .sem-btn { display: flex; align-items: center; gap: 10px; width: 100%; text-align: left; background: rgba(0,0,0,0.02); border: 1px solid rgba(0,0,0,0.06); padding: 16px 18px; border-radius: 14px; cursor: pointer; transition: all 0.25s; margin-top: 16px; }
        .sem-btn:hover { background: rgba(0,0,0,0.04); }
        .sem-btn-icon { font-size: 1.3rem; }
        .sem-btn-text { flex: 1; }
        .sem-btn-title { font-size: 0.88rem; font-weight: 600; color: rgba(30,30,30,0.85); }
        .sem-btn-sub { font-size: 0.72rem; color: rgba(30,30,30,0.6); }
        .sem-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: transparent; z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; opacity: 0; pointer-events: none; transition: opacity 0.3s; }
        .sem-modal.open { opacity: 1; pointer-events: auto; background: rgba(0,0,0,0.05); }
        .sem-modal-content { background: white; border-radius: 24px; max-width: 560px; width: 100%; max-height: 85vh; overflow-y: auto; position: relative; box-shadow: 0 25px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08); }
        .sem-modal-close { position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.05); border: none; width: 32px; height: 32px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; z-index: 10; }
        .sem-header { padding: 28px 24px 20px; }
        .sem-title { font-size: 1.3rem; font-weight: 700; color: #2a2a2a; margin-bottom: 8px; }
        .sem-intro { font-size: 0.86rem; color: rgba(30,30,30,0.6); line-height: 1.7; }
        .sem-body { padding: 0 24px 28px; }
        .sem-level { border: 1px solid rgba(0,0,0,0.06); border-radius: 16px; padding: 18px; margin-bottom: 12px; background: rgba(255,255,255,0.6); }
        .sem-level-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .sem-level-icon { font-size: 1.2rem; }
        .sem-level-name { font-size: 0.95rem; font-weight: 600; color: rgba(30,30,30,0.85); }
        .sem-level-badge { font-size: 0.55rem; font-weight: 600; padding: 3px 10px; border-radius: 100px; text-transform: uppercase; margin-left: auto; }
        .sem-level-desc { font-size: 0.82rem; color: rgba(30,30,30,0.6); line-height: 1.65; margin-bottom: 10px; }
        .sem-level-questions { font-size: 0.75rem; color: rgba(30,30,30,0.65); line-height: 1.5; font-style: italic; margin-bottom: 8px; }
        .sem-level-examples { font-size: 0.75rem; color: rgba(30,30,30,0.5); line-height: 1.5; padding: 10px 12px; background: rgba(0,0,0,0.02); border-radius: 8px; }
        .sem-diagram { display: flex; flex-direction: column; align-items: center; gap: 4px; margin: 20px 0; }
        .sem-ring { border-radius: 100px; display: flex; align-items: center; justify-content: center; font-size: 0.68rem; font-weight: 600; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.2); }
        .enc-nav { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; padding: 10px 12px; background: rgba(255,255,255,0.85); border: 1px solid rgba(0,0,0,0.06); border-radius: 10px; margin-bottom: 16px; position: sticky; top: 10px; z-index: 10; backdrop-filter: blur(10px); }
        .enc-nav-label { font-size: 0.68rem; color: rgba(30,30,30,0.55); font-weight: 500; }
        .enc-nav-btn { background: rgba(0,0,0,0.03); border: 1px solid rgba(0,0,0,0.05); padding: 5px 10px; border-radius: 100px; font-size: 0.72rem; font-weight: 500; color: rgba(30,30,30,0.6); cursor: pointer; transition: all 0.2s; }
        .enc-nav-btn:hover { background: rgba(74,168,124,0.1); border-color: rgba(74,168,124,0.25); color: #3d9b78; }
        .intro-links { margin-top: 40px; display: flex; flex-direction: column; gap: 10px; }
        .intro-link { display: flex; align-items: center; gap: 14px; width: 100%; text-align: left; background: rgba(255,255,255,0.7); border: none; padding: 16px 18px; border-radius: 16px; cursor: pointer; transition: all 0.25s; color: rgba(30,30,30,0.6); }
        .intro-link:hover { background: rgba(255,255,255,0.9); transform: translateX(4px); }
        .intro-link-icon { font-size: 1.4rem; }
        .intro-link-text { flex: 1; }
        .intro-link-title { font-size: 0.92rem; font-weight: 600; color: rgba(30,30,30,0.85); }
        .intro-link-sub { font-size: 0.76rem; color: rgba(30,30,30,0.65); margin-top: 2px; }
        .page-back { display: inline-flex; align-items: center; gap: 6px; background: none; border: none; color: rgba(30,30,30,0.6); font-size: 0.82rem; cursor: pointer; padding: 8px 0; margin-bottom: 20px; transition: color 0.2s; }
        .page-back:hover { color: rgba(30,30,30,0.7); }
        .page-title { font-size: 1.5rem; font-weight: 700; color: #2a2a2a; margin-bottom: 6px; }
        .page-sub { font-size: 0.84rem; color: rgba(30,30,30,0.5); line-height: 1.55; margin-bottom: 20px; }
        .enc-full-card { background: rgba(255,255,255,0.7); border-radius: 12px; padding: 12px 14px; margin-bottom: 8px; cursor: pointer; transition: all 0.2s; }
        .enc-full-card:hover { background: rgba(255,255,255,0.95); }
        .enc-full-card.expanded { background: rgba(255,255,255,0.95); padding: 14px 16px; }
        .enc-full-header { display: flex; align-items: center; gap: 10px; }
        .enc-full-icon { font-size: 1.4rem; }
        .enc-full-name { font-size: 0.92rem; font-weight: 600; color: #2a2a2a; }
        .enc-full-core { font-size: 0.72rem; margin-top: 1px; }
        .enc-full-desc { font-size: 0.8rem; color: rgba(30,30,30,0.55); line-height: 1.55; margin-top: 8px; }
        .enc-full-cat { margin-top: 20px; margin-bottom: 10px; padding-bottom: 6px; border-bottom: 1px solid rgba(0,0,0,0.06); }
        .enc-full-cat:first-child { margin-top: 0; }
        .enc-full-cat-name { font-size: 0.82rem; font-weight: 700; color: rgba(30,30,30,0.7); margin-bottom: 2px; }
        .enc-full-cat-desc { font-size: 0.75rem; color: rgba(30,30,30,0.6); }
        .sem-full-level { background: rgba(255,255,255,0.8); border: 1px solid rgba(0,0,0,0.08); border-radius: 18px; padding: 22px; margin-bottom: 14px; }
        .result-link { display: flex; align-items: center; gap: 12px; width: 100%; text-align: left; background: rgba(0,0,0,0.02); border: none; padding: 14px 16px; border-radius: 14px; cursor: pointer; transition: all 0.25s; color: rgba(30,30,30,0.55); margin-bottom: 10px; }
        .result-link:hover { background: rgba(0,0,0,0.05); transform: translateX(4px); }
        .result-link-icon { font-size: 1.2rem; }
        .result-link-text { flex: 1; }
        .result-link-title { font-size: 0.86rem; font-weight: 600; color: rgba(30,30,30,0.8); }
        .result-link-sub { font-size: 0.72rem; color: rgba(30,30,30,0.6); margin-top: 1px; }
      `}</style>

      <div className="wrap">
        {stage === "intro" && (
          <div className={`fade ${fadeIn ? "on" : ""}`}>
            <div className="badge"><Plant size={14} weight="duotone" style={{ marginRight: 4, verticalAlign: "middle" }} /> Wellness Check-In</div>
            <h1 className="title">How's your <span>inner garden</span> doing?</h1>
            <p className="sub">No right or wrong answers. Just a quiet moment to check in with yourself—like you'd check on a plant. 15 questions. About 4 minutes. You'll get a personalized plant profile, habitat, seasonal guidance, vitality report, and real habits to try.</p>
            <button className="btn" onClick={() => setStage("quiz")}>Let's start →</button>

            <div className="intro-links">
              <button className="intro-link" onClick={() => goToPage("encyclopedia")}>
                <span className="intro-link-icon"><Plant size={20} weight="duotone" /></span>
                <div className="intro-link-text">
                  <div className="intro-link-title">Garden Encyclopedia</div>
                  <div className="intro-link-sub">Explore all 12 plant types</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
              <button className="intro-link" onClick={() => goToPage("sem")}>
                <span className="intro-link-icon"><Flask size={20} weight="duotone" /></span>
                <div className="intro-link-text">
                  <div className="intro-link-title">What is the Socioecological Model?</div>
                  <div className="intro-link-sub">The science behind this quiz</div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>

            <p className="powered-by">Powered by <strong>Dalton Bioanalytics</strong></p>
          </div>
        )}

        {stage === "quiz" && (
          <div className={`fade ${fadeIn ? "on" : ""}`}>
            <div className="prog">
              <div className="prog-track"><div className="prog-fill" style={{ width: `${progress}%` }} /></div>
              <div className="prog-label">{currentQ + 1}/{questions.length}</div>
            </div>
            <QuestionIllustration questionIndex={currentQ} />
            <div className="q-tag">{questions[currentQ].section}</div>
            <p className="q-text">{questions[currentQ].question}</p>
            <div>
              {questions[currentQ].options.map((opt, idx) => (
                <button key={idx} className={`opt ${selectedOption === idx ? "sel" : ""}`} onClick={() => handleSelect(opt.scores, idx)} disabled={selectedOption !== null}>
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>
            {currentQ > 0 && <button className="back" onClick={() => { setCurrentQ((p) => p - 1); setSelectedOption(null); }}>← Back</button>}
          </div>
        )}

        {stage === "results" && result && (
          <div className={`fade ${fadeIn ? "on" : ""}`}>
            <div ref={resultsRef}>
            <div style={{ textAlign: "center", marginBottom: 24 }}><div className="badge">🌿 Your Results</div></div>

            {/* Primary Plant Card */}
            <div className="glass">
              <div className="glass-accent" style={{ background: `linear-gradient(90deg, ${result.primary.color}, ${result.primary.accent})` }} />
              <span className="res-icon"><PlantIcon plantKey={result.primary.key} size={64} color={result.primary.color} /></span>
              <div className="res-you" style={{ color: result.primary.color }}>You are a</div>
              <h2 className="res-name">{result.primary.name}</h2>
              <div className="res-core" style={{ color: result.primary.color }}>{result.primary.core}</div>
              <p className="res-desc">{result.primary.description}</p>

              <div className="fun-fact">
                <div className="fun-fact-icon"><Flask size={20} weight="duotone" /></div>
                <div>
                  <div className="fun-fact-label" style={{ color: result.primary.color }}>Did you know?</div>
                  <div className="fun-fact-text">{result.primary.funFact}</div>
                </div>
              </div>

              <div className="reflect" style={{ background: `${result.primary.color}10`, borderColor: `${result.primary.color}66` }}>
                <div className="reflect-label" style={{ color: result.primary.color }}>Reflect on this</div>
                <p className="reflect-text">{result.primary.reflection}</p>
              </div>

              <div className="sec-label" style={{ marginTop: 0 }}>Try these habits</div>
              {result.primary.habits.map((h, i) => (
                <div className="hab" key={i}>
                  <div className="hab-dot" style={{ background: result.primary.color, opacity: 1 - i * 0.18 }} />
                  <div className="hab-text">{h}</div>
                </div>
              ))}

              <div className="resilience-box">
                <div className="resilience-header">
                  <span className="resilience-icon"><ResilienceIcon resilienceType={result.primary.resilienceType} size={16} color={result.primary.color} /></span>
                  <span className="resilience-title" style={{ color: result.primary.color }}>Your resilience</span>
                  <span className="resilience-badge" style={{ background: `${result.primary.color}18`, color: result.primary.color }}>{result.primary.resilienceType}</span>
                </div>
                <p className="resilience-text">{result.primary.resilience}</p>
              </div>
            </div>

            {/* Habitat Card */}
            <div className="habitat-card">
              <div className="habitat-banner" style={{ background: `linear-gradient(135deg, ${result.habitat.color}15, ${result.habitat.accent}10)` }}>
                <div className="habitat-eyebrow" style={{ color: result.habitat.color }}>Your habitat</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "1.8rem" }}><HabitatIcon habitatKey={result.habitat.key} size={32} color={result.habitat.color} /></span>
                  <div>
                    <div className="habitat-name">{result.habitat.name}</div>
                    <div className="habitat-tagline">{result.habitat.tagline}</div>
                  </div>
                </div>
              </div>
              <div className="habitat-body">
                <p className="habitat-desc">{result.habitat.description}</p>
                <div className="habitat-section" style={{ color: result.habitat.color }}>What this habitat offers you</div>
                <p className="habitat-detail">{result.habitat.offers}</p>
                <div className="habitat-section" style={{ color: "#e0a070" }}><Warning size={14} weight="duotone" style={{ marginRight: 4, verticalAlign: "middle" }} /> Watch for</div>
                <div className="habitat-callout" style={{ background: "rgba(224,160,112,0.06)", borderColor: "rgba(224,160,112,0.35)" }}>
                  <p className="habitat-detail" style={{ color: "#c4804a" }}>{result.habitat.watchFor}</p>
                </div>
                <div className="habitat-section" style={{ color: result.habitat.color }}>In real life, this looks like</div>
                <p className="habitat-detail">{result.habitat.realWorld}</p>
                <div className="habitat-section" style={{ color: result.habitat.color }}>Plants that share this habitat</div>
                <div className="habitat-companions">
                  {result.habitat.plants.map((pk) => {
                    const p = plantProfiles[pk];
                    return <span key={pk} className={`habitat-companion ${pk === result.primary.key ? "you" : ""}`}><PlantIcon plantKey={pk} size={16} color={p.color} /> {p.name} {pk === result.primary.key ? "(you)" : ""}</span>;
                  })}
                </div>
              </div>
            </div>

            {/* Seasons */}
            <div className="glass">
              <div className="vit-title">Seasonal Growth</div>
              <div className="vit-sub">How your {result.primary.name} operates through the growth cycle</div>
              <p style={{ fontSize: "0.76rem", color: "rgba(30,30,30,0.55)", lineHeight: 1.6, marginBottom: 16, fontStyle: "italic" }}>These seasons represent phases of energy and growth in your life—not calendar seasons. You might be in a "winter" of rest during summer, or a "spring" of new beginnings in October.</p>
              {Object.values(seasons).map((s) => {
                const isOpen = expandedSeason === s.key;
                const isPeak = plantSeasons[result.primary.key].peakSeason === s.key;
                return (
                  <div key={s.key} className={`season-card ${isOpen ? "active" : ""}`} onClick={() => setExpandedSeason(isOpen ? null : s.key)}>
                    <div className="season-header">
                      <span className="season-icon"><SeasonIcon seasonKey={s.key} size={24} color={s.color} /></span>
                      <div className="season-info">
                        <div className="season-name">{s.name}</div>
                        <div className="season-tagline">{s.tagline}</div>
                      </div>
                      {isPeak && <span className="season-peak" style={{ background: `${s.color}20`, color: s.color }}>peak season</span>}
                      <div className={`season-chev ${isOpen ? "open" : ""}`}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>
                    <div className={`season-expand ${isOpen ? "open" : ""}`}>
                      <div style={{ padding: "14px 16px", background: `${s.color}10`, borderRadius: 12, borderLeft: `3px solid ${s.color}`, marginBottom: 16 }}>
                        <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: s.color, marginBottom: 6 }}>Your {result.primary.name} in {s.name}</div>
                        <p className="season-detail" style={{ color: "rgba(30,30,30,0.7)" }}>{plantSeasons[result.primary.key][s.key]}</p>
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(30,30,30,0.6)", marginBottom: 6 }}>Signs you're in {s.name.toLowerCase()}</div>
                        <p className="season-detail">{s.signs}</p>
                      </div>

                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(30,30,30,0.6)", marginBottom: 8 }}>Reflections</div>
                        {s.reflections.map((r, ri) => (
                          <p key={ri} style={{ fontSize: "0.84rem", color: "rgba(30,30,30,0.6)", lineHeight: 1.5, fontStyle: "italic", marginBottom: 6 }}>{r}</p>
                        ))}
                      </div>

                      <div>
                        <div style={{ fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(30,30,30,0.6)", marginBottom: 8 }}>Habits for this season</div>
                        {s.habits.map((h, hi) => (
                          <div key={hi} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                            <span style={{ color: s.color, fontSize: "0.6rem", marginTop: 4 }}>●</span>
                            <span style={{ fontSize: "0.82rem", color: "rgba(30,30,30,0.6)", lineHeight: 1.45 }}>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vitality Report */}
            <div className="glass">
              <div className="vit-title">Vitality Report</div>
              <div className="vit-sub">Tap each dimension to learn more</div>
              <div className="vit-overall">
                <div className="vit-ov-icon"><Plant size={28} weight="duotone" color="#6b8f71" /></div>
                <div style={{ flex: 1 }}>
                  <div className="vit-ov-label">Overall Vitality</div>
                  <div className="vit-ov-row">
                    <div className="vit-ov-score" style={{ color: getHealthColor(overallVitality) }}>{overallVitality}%</div>
                    <div className="vit-ov-status" style={{ color: getHealthColor(overallVitality) }}>{getHealthLabel(overallVitality)}</div>
                  </div>
                  <div className="vit-ov-track">
                    <div className="vit-ov-fill" style={{ width: resultRevealed ? `${overallVitality}%` : "0%", background: `linear-gradient(90deg, ${getHealthColor(overallVitality)}88, ${getHealthColor(overallVitality)})` }} />
                  </div>
                </div>
              </div>
              {vitalityScores.map((dim, i) => (
                <div key={dim.key}>
                  <div className="vit-row" onClick={() => setExpandedBars((p) => ({ ...p, [dim.key]: !p[dim.key] }))}>
                    <div className="vit-icon"><VitalityIcon vitalityKey={dim.key} size={20} color={dim.color} /></div>
                    <div className="vit-info">
                      <div className="vit-header">
                        <div className="vit-name">{dim.label}</div>
                        <div className="vit-badge" style={{ background: `${getHealthColor(dim.score)}18`, color: getHealthColor(dim.score) }}>{getHealthLabel(dim.score)}</div>
                      </div>
                      <div className="vit-track" style={{ marginTop: 8 }}>
                        <div className="vit-fill" style={{ width: resultRevealed ? `${Math.max(dim.score, 4)}%` : "0%", background: `linear-gradient(90deg, ${dim.color}88, ${dim.color})`, transitionDelay: `${0.4 + i * 0.15}s` }} />
                      </div>
                    </div>
                    <div className={`vit-chev ${expandedBars[dim.key] ? "open" : ""}`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                  </div>
                  <div className={`vit-expand ${expandedBars[dim.key] ? "open" : ""}`}>
                    <p style={{ fontSize: "0.84rem", color: "rgba(30,30,30,0.6)", lineHeight: 1.7, marginBottom: 16 }}>{dim.description}</p>
                    <div style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: getHealthColor(dim.score), marginBottom: 8 }}>
                      Your reading — {getHealthLabel(dim.score)}
                    </div>
                    <div className="vit-insight" style={{ background: `${getHealthColor(dim.score)}0c`, borderColor: `${getHealthColor(dim.score)}55` }}>
                      {getScoreDescription(dim, dim.score)}
                    </div>
                  </div>
                  {i < vitalityScores.length - 1 && <div className="vit-sep" />}
                </div>
              ))}
            </div>

            {/* Spectrum */}
            <div className="glass">
              <div className="sec-label" style={{ marginTop: 0 }}>Your Plant Spectrum</div>
              {result.sorted.filter(([, s]) => s > 0).slice(0, 7).map(([key, score], i) => {
                const p = plantProfiles[key];
                const pct = maxScore > 0 ? (score / maxScore) * 100 : 0;
                return (
                  <div className="spec-row" key={key}>
                    <div className="spec-name">{p.name}</div>
                    <div className="spec-track">
                      <div className="spec-fill" style={{ width: resultRevealed ? `${pct}%` : "0%", background: `linear-gradient(90deg, ${p.color}, ${p.accent})`, transitionDelay: `${i * 0.1}s` }} />
                    </div>
                    <div className="spec-icon"><PlantIcon plantKey={key} size={20} color={p.color} /></div>
                  </div>
                );
              })}
            </div>

            {/* Secondary Plants */}
            <div className="sec-label">Also strong in you</div>
            {[result.secondary, result.tertiary].map((p) => (
              <div className="sec-card" key={p.key}>
                <div className="sec-head">
                  <span className="sec-ico"><PlantIcon plantKey={p.key} size={28} color={p.color} /></span>
                  <div>
                    <div className="sec-name">{p.name}</div>
                    <div className="sec-core">{p.core}</div>
                  </div>
                </div>
                <p className="sec-desc">{p.description}</p>
              </div>
            ))}

            {/* Learn More Links */}
            <div className="sec-label">Learn more</div>
            <button className="result-link" onClick={() => goToPage("encyclopedia")}>
              <span className="result-link-icon"><Plant size={20} weight="duotone" /></span>
              <div className="result-link-text">
                <div className="result-link-title">Garden Encyclopedia</div>
                <div className="result-link-sub">Explore all 12 plant types</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>
            <button className="result-link" onClick={() => goToPage("sem")}>
              <span className="result-link-icon"><Flask size={20} weight="duotone" /></span>
              <div className="result-link-text">
                <div className="result-link-title">What is the Socioecological Model?</div>
                <div className="result-link-sub">The science behind this quiz</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            </div>
            {/* End of resultsRef */}

            {/* Email Results */}
            <div className="email-section">
              <div className="email-title">Email Your Results</div>
              <p className="email-sub">Get your plant wellness results sent to your inbox</p>
              <p className="email-powered">Powered by <strong>Dalton Bioanalytics</strong> — we also offer a blood wellness testing kit. Subscribe to receive your plant results and information about our testing kit.</p>
              <form onSubmit={handleSendEmail} className="email-form">
                <label className="email-consent">
                  <input
                    type="checkbox"
                    checked={emailConsent}
                    onChange={(e) => setEmailConsent(e.target.checked)}
                    required
                  />
                  <span>I agree to receive my plant wellness results and information about the Dalton Bioanalytics blood wellness testing kit.</span>
                </label>
                <div>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-input"
                    required
                  />
                  <button type="submit" className="email-btn" disabled={emailStatus === "sending" || !emailConsent}>
                    {emailStatus === "sending" ? "Sending..." : emailStatus === "sent" ? "Sent!" : "Email Results"}
                  </button>
                </div>
              </form>
              {emailStatus === "sent" && (
                <p className="email-success">Check your inbox! Your results are on the way.</p>
              )}
              {emailStatus === "error" && (
                <p className="email-error">Couldn't send email. Please try again.</p>
              )}
            </div>

            {/* Actions */}
            <div style={{ textAlign: "center", marginTop: 28, display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              <button className="btn-share" onClick={handleShare}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                Share results
              </button>
              <button className="btn-again" onClick={restart}><ArrowCounterClockwise size={14} weight="bold" style={{ marginRight: 4, verticalAlign: "middle" }} /> Take it again</button>
            </div>

            {shareToast && <div className="share-toast"><Check size={14} weight="bold" style={{ marginRight: 4, verticalAlign: "middle" }} /> Copied to clipboard!</div>}

            <p className="closing">Wherever you are right now is a valid place to be.<br />Growth isn't always visible, and rest is part of the cycle.</p>
          </div>
        )}

        {stage === "encyclopedia" && (
          <div className={`fade ${fadeIn ? "on" : ""}`}>
            <button className="page-back" onClick={goBack}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              Back
            </button>
            <h1 className="page-title"><Plant size={24} weight="duotone" style={{ marginRight: 8, verticalAlign: "middle" }} /> Garden Encyclopedia</h1>
            <p className="page-sub">12 plant types, 4 habitats, 4 seasons. Tap any card to expand.</p>

            {/* Jump Navigation */}
            <div className="enc-nav">
              <span className="enc-nav-label">Jump to:</span>
              <button className="enc-nav-btn" onClick={() => document.getElementById('enc-plants').scrollIntoView({ behavior: 'smooth' })}>
                <Plant size={14} weight="duotone" style={{ marginRight: 4, verticalAlign: "middle" }} /> Plants
              </button>
              <button className="enc-nav-btn" onClick={() => document.getElementById('enc-habitats').scrollIntoView({ behavior: 'smooth' })}>
                <Mountains size={14} weight="duotone" style={{ marginRight: 4, verticalAlign: "middle" }} /> Habitats
              </button>
              <button className="enc-nav-btn" onClick={() => document.getElementById('enc-seasons').scrollIntoView({ behavior: 'smooth' })}>
                <Leaf size={14} weight="duotone" style={{ marginRight: 4, verticalAlign: "middle" }} /> Seasons
              </button>
            </div>

            {/* Plants Section */}
            <div id="enc-plants" style={{ marginBottom: 32, scrollMarginTop: 20 }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#2a2a2a", marginBottom: 12 }}>The Twelve Plant Types</h2>

              {plantCategories.map((cat, catIdx) => (
                <div key={cat.name}>
                  <div className="enc-full-cat" style={catIdx === 0 ? { marginTop: 0 } : {}}>
                    <div className="enc-full-cat-name">{cat.name}</div>
                  </div>
                  {cat.plants.map((pk) => {
                    const p = plantProfiles[pk];
                    const isYou = result && pk === result.primary.key;
                    const isExpanded = expandedPlant === pk;
                    return (
                      <div key={pk} className={`enc-full-card ${isExpanded ? "expanded" : ""}`} onClick={() => setExpandedPlant(isExpanded ? null : pk)} style={isYou ? { background: "rgba(74,168,124,0.08)" } : {}}>
                        <div className="enc-full-header">
                          <span className="enc-full-icon"><PlantIcon plantKey={pk} size={28} color={p.color} /></span>
                          <div style={{ flex: 1 }}>
                            <div className="enc-full-name">{p.name}{isYou ? " (You)" : ""}</div>
                            <div className="enc-full-core" style={{ color: p.color }}>{p.core}</div>
                          </div>
                          <div style={{ color: "rgba(30,30,30,0.5)", transition: "transform 0.25s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        </div>

                        <div style={{ maxHeight: isExpanded ? 1200 : 0, overflow: "hidden", opacity: isExpanded ? 1 : 0, transition: "all 0.3s ease" }}>
                          <p className="enc-full-desc">{p.description}</p>

                          <div style={{ marginTop: 14, padding: "10px 12px", background: `${p.color}08`, borderRadius: 8, borderLeft: `3px solid ${p.color}` }}>
                            <div style={{ fontSize: "0.68rem", fontWeight: 600, color: p.color, marginBottom: 4 }}>Reflect on this</div>
                            <p style={{ fontSize: "0.78rem", color: "rgba(30,30,30,0.6)", lineHeight: 1.5, fontStyle: "italic" }}>{p.reflection}</p>
                          </div>

                          <div style={{ marginTop: 14 }}>
                            <div style={{ fontSize: "0.68rem", fontWeight: 600, color: p.color, marginBottom: 6 }}>Habits to try</div>
                            {p.habits.map((h, hi) => (
                              <div key={hi} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 4 }}>
                                <span style={{ color: p.color, fontSize: "0.5rem", marginTop: 4 }}>●</span>
                                <span style={{ fontSize: "0.76rem", color: "rgba(30,30,30,0.55)", lineHeight: 1.4 }}>{h}</span>
                              </div>
                            ))}
                          </div>

                          <div style={{ marginTop: 14, padding: "10px 12px", background: "rgba(0,0,0,0.02)", borderRadius: 8 }}>
                            <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "rgba(30,30,30,0.5)", marginBottom: 4 }}>Did you know?</div>
                            <p style={{ fontSize: "0.76rem", color: "rgba(30,30,30,0.5)", lineHeight: 1.5 }}>{p.funFact}</p>
                          </div>

                          <div style={{ marginTop: 14 }}>
                            <div style={{ fontSize: "0.68rem", fontWeight: 600, color: p.color, marginBottom: 4 }}>Resilience: {p.resilienceType}</div>
                            <p style={{ fontSize: "0.76rem", color: "rgba(30,30,30,0.55)", lineHeight: 1.5 }}>{p.resilience}</p>
                          </div>

                          <div style={{ marginTop: 12, fontSize: "0.72rem", color: "rgba(30,30,30,0.6)" }}>
                            Habitat: <HabitatIcon habitatKey={plantToHabitat[pk]} size={14} color={habitats[plantToHabitat[pk]].color} /> {habitats[plantToHabitat[pk]].name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Habitats Section */}
            <div id="enc-habitats" style={{ marginBottom: 32, scrollMarginTop: 20 }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#2a2a2a", marginBottom: 12 }}>The Four Habitats</h2>
              {Object.values(habitats).map((h) => {
                const isYourHabitat = result && result.habitat.key === h.key;
                const isExpanded = expandedHabitat === h.key;
                return (
                  <div key={h.key} className={`enc-full-card ${isExpanded ? "expanded" : ""}`} onClick={() => setExpandedHabitat(isExpanded ? null : h.key)} style={isYourHabitat ? { background: "rgba(74,168,124,0.08)" } : {}}>
                    <div className="enc-full-header">
                      <span className="enc-full-icon"><HabitatIcon habitatKey={h.key} size={28} color={h.color} /></span>
                      <div style={{ flex: 1 }}>
                        <div className="enc-full-name">{h.name}{isYourHabitat ? " (Yours)" : ""}</div>
                        <div className="enc-full-core" style={{ color: h.color }}>{h.tagline}</div>
                      </div>
                      <div style={{ color: "rgba(30,30,30,0.5)", transition: "transform 0.25s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>

                    <div style={{ maxHeight: isExpanded ? 600 : 0, overflow: "hidden", opacity: isExpanded ? 1 : 0, transition: "all 0.3s ease" }}>
                      <p className="enc-full-desc">{h.description}</p>

                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: "0.68rem", fontWeight: 600, color: h.color, marginBottom: 4 }}>What this habitat offers</div>
                        <p style={{ fontSize: "0.76rem", color: "rgba(30,30,30,0.55)", lineHeight: 1.5 }}>{h.offers}</p>
                      </div>

                      <div style={{ marginTop: 12, padding: "10px 12px", background: "rgba(224,160,112,0.06)", borderRadius: 8, borderLeft: "3px solid rgba(224,160,112,0.5)" }}>
                        <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "#e0a070", marginBottom: 4 }}>Watch for</div>
                        <p style={{ fontSize: "0.76rem", color: "rgba(30,30,30,0.55)", lineHeight: 1.5 }}>{h.watchFor}</p>
                      </div>

                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: "0.68rem", fontWeight: 600, color: h.color, marginBottom: 4 }}>In real life</div>
                        <p style={{ fontSize: "0.76rem", color: "rgba(30,30,30,0.55)", lineHeight: 1.5 }}>{h.realWorld}</p>
                      </div>

                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "rgba(30,30,30,0.6)", marginBottom: 6 }}>Plants in this habitat</div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {h.plants.map((pk) => {
                            const p = plantProfiles[pk];
                            const isYou = result && pk === result.primary.key;
                            return (
                              <span key={pk} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 100, background: isYou ? "rgba(74,168,124,0.1)" : "rgba(0,0,0,0.03)", border: isYou ? "1px solid rgba(74,168,124,0.25)" : "1px solid rgba(0,0,0,0.05)", fontSize: "0.68rem", color: "rgba(30,30,30,0.55)" }}>
                                <PlantIcon plantKey={pk} size={14} color={p.color} /> {p.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Seasons Section */}
            <div id="enc-seasons" style={{ marginBottom: 32, scrollMarginTop: 20 }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#2a2a2a", marginBottom: 8 }}>The Four Seasons</h2>
              <p style={{ fontSize: "0.76rem", color: "rgba(30,30,30,0.55)", lineHeight: 1.6, marginBottom: 16, fontStyle: "italic" }}>These seasons represent phases of energy and growth—not calendar seasons. You might be in "winter" during summer, or "spring" in October.</p>
              {Object.values(seasons).map((s) => {
                const isExpanded = expandedEncSeason === s.key;
                return (
                  <div key={s.key} className={`enc-full-card ${isExpanded ? "expanded" : ""}`} onClick={() => setExpandedEncSeason(isExpanded ? null : s.key)}>
                    <div className="enc-full-header">
                      <span className="enc-full-icon"><SeasonIcon seasonKey={s.key} size={28} color={s.color} /></span>
                      <div style={{ flex: 1 }}>
                        <div className="enc-full-name">{s.name}</div>
                        <div className="enc-full-core" style={{ color: s.color }}>{s.tagline}</div>
                      </div>
                      <div style={{ color: "rgba(30,30,30,0.5)", transition: "transform 0.25s", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>

                    <div style={{ maxHeight: isExpanded ? 600 : 0, overflow: "hidden", opacity: isExpanded ? 1 : 0, transition: "all 0.3s ease" }}>
                      <div style={{ marginTop: 8 }}>
                        <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "rgba(30,30,30,0.6)", marginBottom: 4 }}>Signs you're in {s.name.toLowerCase()}</div>
                        <p className="enc-full-desc">{s.signs}</p>
                      </div>

                      <div style={{ marginTop: 12, padding: "10px 12px", background: `${s.color}08`, borderRadius: 8, borderLeft: `3px solid ${s.color}` }}>
                        <div style={{ fontSize: "0.68rem", fontWeight: 600, color: s.color, marginBottom: 6 }}>Reflections</div>
                        {s.reflections.map((r, ri) => (
                          <p key={ri} style={{ fontSize: "0.76rem", color: "rgba(30,30,30,0.55)", lineHeight: 1.5, fontStyle: "italic", marginBottom: 4 }}>{r}</p>
                        ))}
                      </div>

                      <div style={{ marginTop: 12 }}>
                        <div style={{ fontSize: "0.68rem", fontWeight: 600, color: s.color, marginBottom: 6 }}>Habits for this season</div>
                        {s.habits.map((h, hi) => (
                          <div key={hi} style={{ display: "flex", alignItems: "flex-start", gap: 6, marginBottom: 4 }}>
                            <span style={{ color: s.color, fontSize: "0.5rem", marginTop: 4 }}>●</span>
                            <span style={{ fontSize: "0.76rem", color: "rgba(30,30,30,0.55)", lineHeight: 1.4 }}>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ marginTop: 32, textAlign: "center" }}>
              <button className="btn" onClick={() => { setCurrentQ(0); setAnswers({}); setSelectedOption(null); setChosenIndices({}); setStage("quiz"); }}>
                Take the Quiz →
              </button>
            </div>
          </div>
        )}

        {stage === "sem" && (
          <div className={`fade ${fadeIn ? "on" : ""}`}>
            <button className="page-back" onClick={goBack}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
              Back
            </button>
            <h1 className="page-title"><Flask size={24} weight="duotone" style={{ marginRight: 8, verticalAlign: "middle" }} /> What is the Socioecological Model?</h1>
            <p className="page-sub">This quiz is based on the Socioecological Model (SEM), a framework from public health that recognizes wellbeing is shaped by multiple levels—from individual choices to the systems we live within.</p>

            <div className="sem-diagram" style={{ marginBottom: 32 }}>
              {[
                { name: "Policy & Culture", w: 280, h: 56, color: "#88b888" },
                { name: "Community", w: 230, h: 50, color: "#6aadcc" },
                { name: "Organizational", w: 180, h: 44, color: "#e8c44c" },
                { name: "Interpersonal", w: 130, h: 38, color: "#c490b8" },
                { name: "Individual", w: 80, h: 32, color: "#a0927a" },
              ].map((ring) => (
                <div key={ring.name} className="sem-ring" style={{ width: ring.w, height: ring.h, background: ring.color }}>{ring.name}</div>
              ))}
            </div>

            <p style={{ fontSize: "0.88rem", color: "rgba(30,30,30,0.6)", lineHeight: 1.75, marginBottom: 28 }}>
              The SEM shows that your health isn't just about personal choices. It's influenced by your relationships, the organizations you're part of, your community, and broader cultural and policy forces. The five vitality dimensions in this quiz map directly to these levels.
            </p>

            {semLevels.map((level) => {
              const vitality = vitalityScores.find((v) => v.key === level.vitalityKey);
              return (
                <div className="sem-full-level" key={level.key}>
                  <div className="sem-level-header" style={{ marginBottom: 12 }}>
                    <span className="sem-level-icon" style={{ fontSize: "1.4rem" }}>{level.icon}</span>
                    <span className="sem-level-name" style={{ fontSize: "1.05rem" }}>{level.name}</span>
                    {result && vitality && (
                      <span className="sem-level-badge" style={{ background: `${getHealthColor(vitality.score)}18`, color: getHealthColor(vitality.score) }}>
                        Your {vitality.label}: {getHealthLabel(vitality.score)}
                      </span>
                    )}
                  </div>
                  <p className="sem-level-desc" style={{ fontSize: "0.88rem", marginBottom: 12 }}>{level.description}</p>
                  <p className="sem-level-questions" style={{ marginBottom: 10 }}>{level.questions}</p>
                  <div className="sem-level-examples"><strong>Real-world examples:</strong> {level.examples}</div>
                </div>
              );
            })}

            <div style={{ marginTop: 32, padding: "20px 24px", background: "rgba(74,168,124,0.06)", borderRadius: 16, border: "1px solid rgba(74,168,124,0.15)" }}>
              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#3d9b78", marginBottom: 8 }}>Why this matters</div>
              <p style={{ fontSize: "0.86rem", color: "rgba(30,30,30,0.6)", lineHeight: 1.7 }}>
                Traditional wellness advice focuses almost entirely on individual behavior—eat better, exercise more, sleep more. But the SEM shows that many factors affecting your health are outside your direct control. Understanding this can reduce self-blame and help you focus energy where it actually makes a difference.
              </p>
            </div>

            <div style={{ marginTop: 32, textAlign: "center" }}>
              <button className="btn" onClick={() => { setCurrentQ(0); setAnswers({}); setSelectedOption(null); setChosenIndices({}); setStage("quiz"); }}>
                Take the Quiz →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
