import styled from 'styled-components';
import Button from '../button/Button';
import { useAlert } from '../../../hooks/useAlert';

const Alert = () => {
	const { alertData, closeAlert } = useAlert();

	function handleOnClick() {
		if (alertData.callBack) alertData.callBack();
		else closeAlert();
	}

	return (
		<>
			{alertData.isOpen && (
				<>
					<Overlay />
					<AlertContainer>
						<AlertContent>{alertData.content}</AlertContent>
						<Button title="확인" onClick={handleOnClick} />
					</AlertContainer>
				</>
			)}
		</>
	);
};

export default Alert;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const AlertContainer = styled.div`
    ${({ theme }) => theme.mixins.flexBox('column', 'flex-end', 'center')};
    ${({ theme }) => theme.fonts.modal};

    width: 18.7rem;
    padding: 3.3rem 3.5rem 1rem 3.5rem;

    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    border-radius: 12px;
    gap: 2.8rem;
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.colors.white};
    z-index: 1000;
`;

const AlertContent = styled.div`
    ${({ theme }) => theme.mixins.flexBox()};
    white-space: pre-wrap;
`;
