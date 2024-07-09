import React, { useState } from "react";
import styled from "styled-components";
import { TabList } from "../../core/Tab";

interface TabProps {
    onChange: (tab: string) => void;
    onAdd: () => void;
}

export default function Tab({ onChange, onAdd }: TabProps) {
    const [currentTab, setCurrentTab] = useState<string>(TabList[0]);

    function handleOnClick(tab: string) {
        setCurrentTab(tab);
        onChange(tab);
    }

    return (
        <TabContainer>
            {TabList.map((tab) => (
                <TabItem
                    selected={currentTab === tab}
                    onClick={() => handleOnClick(tab)}
                >
                    {tab}
                </TabItem>
            ))}

            <Image
                src="/images/ic_add.svg"
                alt="add"
                width={"28px"}
                onClick={onAdd}
            />
        </TabContainer>
    );
}

const TabContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox("row", "flex-start", "center")};
    ${({ theme }) => theme.fonts.tab};

    width: 100%;
    max-width: 452px;
    padding-right: 80px;

    position: fixed;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);

    border-bottom: 1px solid ${({ theme }) => theme.colors.light_gray};
`;

const TabItem = styled.div<{ selected: boolean }>`
    flex: 1;
    text-align: center;
    padding: 20px;

    cursor: pointer;
    color: ${({ selected, theme }) =>
        selected ? theme.colors.main : theme.colors.main_gray};
`;

const Image = styled.img`
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`;
