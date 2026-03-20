// src/components/graph/GraphEvents.tsx

import { useEffect, type FC } from "react";
import { useRegisterEvents, useSigma } from "@react-sigma/core";

export interface TooltipData {
  label: string;
  category: string;
  type: string;
  mouseX: number;
  mouseY: number;
}

interface GraphEventsProps {
  onNodeClick?: (nodeId: string, url: string) => void;
  onHoverChange?: (data: TooltipData | null) => void;
  onHoveredNodeChange?: (nodeId: string | null) => void;
}

const GraphEvents: FC<GraphEventsProps> = ({ onNodeClick, onHoverChange, onHoveredNodeChange }) => {
  const sigma = useSigma();
  const registerEvents = useRegisterEvents();

  useEffect(() => {
    const handlers = {
      enterNode: (event: { node: string; event: { x: number; y: number } }) => {
        const graph = sigma.getGraph();
        if (onHoverChange) {
          onHoverChange({
            label: graph.getNodeAttribute(event.node, "label") as string,
            category: graph.getNodeAttribute(event.node, "category") as string,
            type: graph.getNodeAttribute(event.node, "nodeType") as string,
            mouseX: event.event.x,
            mouseY: event.event.y,
          });
        }
        if (onHoveredNodeChange) onHoveredNodeChange(event.node);
      },
      leaveNode: () => {
        if (onHoverChange) onHoverChange(null);
        if (onHoveredNodeChange) onHoveredNodeChange(null);
      },
      clickNode: (event: { node: string }) => {
        const graph = sigma.getGraph();
        const url = graph.getNodeAttribute(event.node, "url") as string;
        if (onNodeClick) onNodeClick(event.node, url);
      },
    };
    registerEvents(handlers);
  }, [registerEvents, sigma, onNodeClick, onHoverChange, onHoveredNodeChange]);

  return null;
};

export default GraphEvents;
