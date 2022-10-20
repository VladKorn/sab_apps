import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { SwipeablePanel as _SwipeablePanel } from "rn-swipeable-panel";

export const SwipeablePanel = () => {
	const [panelProps, setPanelProps] = useState({
		fullWidth: true,
		openLarge: true,
		showCloseButton: true,
		onClose: () => closePanel(),
		onPressCloseButton: () => closePanel(),
	});
	const [isPanelActive, setIsPanelActive] = useState(false);

	const openPanel = () => {
		setIsPanelActive(true);
	};

	const closePanel = () => {
		setIsPanelActive(false);
	};

	return (
		<_SwipeablePanel {...panelProps} isActive={isPanelActive}>
			<Text style={{}}>To get started, edit App.js</Text>
		</_SwipeablePanel>
	);
};
