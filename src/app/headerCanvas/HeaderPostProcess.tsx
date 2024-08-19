import {
    EffectComposer,
    DepthOfField,
    Vignette,
} from "@react-three/postprocessing";

const HeaderPostProcess = () => {
    return (
        <EffectComposer>
            <DepthOfField focusDistance={0} focalLength={1} bokehScale={20} />
            <Vignette darkness={1.1} offset={0.02} />
        </EffectComposer>
    );
};

export default HeaderPostProcess;
