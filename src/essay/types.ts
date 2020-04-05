import { BasePanelProps } from "../components/BasePanel";
import { ParallaxPanelProps } from "../components/ParallaxPanel";
import { ProteinViewerProps } from "../components/ProteinViewer";
import { SectionPanelProps } from "../components/SectionPanel";
import { StickyVisualProps } from "../components/StickyVisual";
import { TwoColumnPanelProps } from "../components/TwoColumnPanel";

export interface SectionProps {
    currentPanel: number;
    progress: number;
}

export type PanelProps =
    | BasePanelProps
    | ParallaxPanelProps
    | ProteinViewerProps
    | SectionPanelProps
    | StickyVisualProps
    | TwoColumnPanelProps;
