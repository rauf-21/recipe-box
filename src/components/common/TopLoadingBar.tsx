import type { ComponentProps } from "react";
import { useRouter } from "next/router";
import { useReducer, useEffect } from "react";
import { match } from "ts-pattern";
import { motion, isValidMotionProp } from "framer-motion";
import { chakra, shouldForwardProp, Portal } from "@chakra-ui/react";

interface RouteChangeStatusState {
  status: "ROUTE_CHANGE_STATUS_START" | "ROUTE_CHANGE_STATUS_COMPLETE";
}

interface RouteChangeStatusAction {
  type: "ROUTE_CHANGE_START" | "ROUTE_CHANGE_COMPLETE";
}

const AnimatedBox = chakra(motion.div, {
  shouldForwardProp: (props) =>
    isValidMotionProp(props) || shouldForwardProp(props),
});

function getTopLoadingBarProps(status: RouteChangeStatusState["status"]) {
  const baseProps: ComponentProps<typeof AnimatedBox> = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    h: 2,
    w: "100%",
    bg: "primary.600",
    opacity: 0,
    zIndex: 999999,
    margin: 0,
  };

  return match<
    RouteChangeStatusState["status"],
    ComponentProps<typeof AnimatedBox>
  >(status)
    .with("ROUTE_CHANGE_STATUS_START", () => ({
      ...baseProps,
      animate: {
        opacity: 1,
        scaleX: [0, 0.6],
      },
    }))
    .with("ROUTE_CHANGE_STATUS_COMPLETE", () => ({
      ...baseProps,
      animate: {
        opacity: [1, 0],
        scaleX: 1,
      },
    }))
    .exhaustive();
}

export default function TopLoadingBar() {
  const router = useRouter();

  const initialState: RouteChangeStatusState = {
    status: "ROUTE_CHANGE_STATUS_COMPLETE",
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(
    state: RouteChangeStatusState,
    action: RouteChangeStatusAction
  ): RouteChangeStatusState {
    return match<RouteChangeStatusAction["type"], RouteChangeStatusState>(
      action.type
    )
      .with("ROUTE_CHANGE_START", () => ({
        ...state,
        status: "ROUTE_CHANGE_STATUS_START",
      }))
      .with("ROUTE_CHANGE_COMPLETE", () => ({
        ...state,
        status: "ROUTE_CHANGE_STATUS_COMPLETE",
      }))
      .exhaustive();
  }

  useEffect(() => {
    function handleRouteChangeStart() {
      dispatch({ type: "ROUTE_CHANGE_START" });
    }

    function handleRouteChangeComplete() {
      dispatch({ type: "ROUTE_CHANGE_COMPLETE" });
    }

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <Portal>
      <AnimatedBox {...getTopLoadingBarProps(state.status)} />
    </Portal>
  );
}
