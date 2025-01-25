import styled, { keyframes } from 'styled-components';
import dummies from '../dummies.json';
import { InfoBoxWrapper, InfoButton } from '../../prompt/TopBox';
import { InputFormat } from '../../../hooks/mutations/prompt/usePostPrompt';
import TextArea from 'antd/es/input/TextArea';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { StarOutlined } from '@ant-design/icons';

const data = dummies.data;
const option = data.user_input_format[0];

interface FakePromptProps {
	onNext: () => void;
}

export default function FakePrompt({ onNext }: FakePromptProps) {
	const ref1 = useRef<HTMLDivElement>(null);
	const propertyRefs = useRef<Record<string, PropertyRef>>({});

	return (
		<>
			<FakeTopBox />

			<Title>{data.title}</Title>
			<Description>{data.description}</Description>

			<div ref={ref1}>
				<FakeProperty
					key={option.name}
					option={option as InputFormat}
					ref={(el) => {
						if (el) propertyRefs.current[option.name] = el;
					}}
				/>
			</div>
		</>
	);
}

const Title = styled.h2`
    ${({ theme }) => theme.fonts.title};
    margin: 10px 0;
`;

const Description = styled.h2`
    ${({ theme }) => theme.fonts.description};
    color: ${({ theme }) => theme.colors.deep_gray};
    margin-bottom: 20px;
`;

export interface PropertyProps {
	option: InputFormat;
}

export interface PropertyRef {
	fill: () => void;
}

const FakeProperty = forwardRef<PropertyRef, PropertyProps>(({ option }, ref) => {
	const [value, setValue] = useState<string | undefined>();

	useImperativeHandle(ref, () => ({
		fill: fillValue,
	}));

	function fillValue() {
		setValue(option.placeholder.replace('ex. ', ''));
	}

	function handleOnClick() {
		fillValue();
	}

	return (
		<PropertyContainer>
			<PropertyTitle>{option.name}</PropertyTitle>

			{option.type === 'text' && (
				<PulsingTextArea placeholder={option.placeholder} value={value} onClick={handleOnClick} />
			)}
		</PropertyContainer>
	);
});

const PropertyContainer = styled.div`
    margin: 30px 0;
`;

const PropertyTitle = styled.h3`
    ${({ theme }) => theme.fonts.subtitle};
    margin: 5px 0;
`;

const FakeTopBox = () => {
	return (
		<InfoBoxWrapper>
			<Tooltip title="favorite">
				<Button shape="circle" icon={<StarOutlined />} />
			</Tooltip>
			<InfoButton onInformationClick={() => {}} />
		</InfoBoxWrapper>
	);
};

// Define the pulse animation
const pulse = keyframes`
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }
    60% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }
    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
`;

const PulsingTextArea = styled(TextArea)`
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
    transform: scale(1);
    animation: ${pulse} 2s infinite;
`;
