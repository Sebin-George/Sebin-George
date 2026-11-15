// Background layers for the ported design: the 3D water scene (loaded by the Next version, from /public/scene)
// with the blue glass cube drawn on top of it. Both are fixed behind the page content.
import WaterScene from "@/components/SceneBackground";
import GlassCube from "@/components/GlassCube";

export default function SceneBackground() {
  return (
    <>
      <WaterScene />
      <GlassCube />
    </>
  );
}
