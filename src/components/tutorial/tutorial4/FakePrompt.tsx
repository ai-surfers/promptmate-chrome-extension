import styled from 'styled-components';
import dummies from '../dummies.json';
import { InfoBoxWrapper, InfoButton } from '../../prompt/TopBox';
import { InputFormat } from '../../../hooks/mutations/prompt/usePostPrompt';
import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Button, Tooltip, Tour, TourProps } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { populateTemplate } from '../../../utils';
import { insertPromptToDOMInput } from '../../../service/chrome/utils';

const data = dummies.data;

interface FakePromptProps {
	onNext: () => void;
}

export default function FakePrompt({ onNext }: FakePromptProps) {
	const ref1 = useRef<HTMLDivElement>(null);
	const ref2 = useRef<HTMLButtonElement>(null); // Ref for the button
	const propertyRefs = useRef<Record<string, PropertyRef>>({});

	return (
		<>
			<FakeTopBox />

			<Title>{data.title}</Title>
			<Description>{data.description}</Description>

			<div ref={ref1}>
				{data.user_input_format.map((option, index) => (
					<FakeProperty
						key={option.name}
						option={option as InputFormat}
						ref={(el) => {
							if (el) propertyRefs.current[option.name] = el;
						}}
					/>
				))}
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
	return (
		<PropertyContainer>
			<PropertyTitle>{option.name}</PropertyTitle>

			{option.type === 'text' && (
				<FakeTextArea>{option.placeholder.replace('ex. ', '')}</FakeTextArea>
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

const FakeTextArea = styled.div`
    background: #ffffff;
    border-width: 1px;
    border-style: solid;
    border-color: #d9d9d9;
    border-radius: 5px;
    padding: 4px 11px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.88);
    box-sizing: border-box;
    margin: 0;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    font-family: Suit;
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    border-radius: 6px;
    transition: all 0.2s;
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
