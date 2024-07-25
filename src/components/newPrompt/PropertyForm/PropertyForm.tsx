import { useRef, useState } from "react";
import styled from "styled-components";

/**
 *
 * div contentEditable 테스트 코드
 * 1. 렌더링 이슈 2. 한글 자모음 분리 이슈로
 * 미사용
 */
export default function PropertyForm() {
    const editorRef = useRef<HTMLDivElement>(null);
    const [content, setContent] = useState<string>("");

    const handleInput = () => {
        if (editorRef.current) {
            const content = editorRef.current.innerText;

            // 기존 HTML에서 highlight 처리된 부분을 제외한 나머지 부분만 처리
            const updatedHtml = content.replace(
                /(?<!<span class="highlight">)\{\{(.*?)\}\}(?!<\/span>)/g,
                '<span class="highlight">{{$1}}</span>'
            );

            // HTML 업데이트
            editorRef.current.innerHTML = updatedHtml;
            setContent(updatedHtml); // 업데이트된 내용을 상태로 저장

            // 입력 후 포커스 및 텍스트 선택
            const range = document.createRange();
            const sel = window.getSelection();
            if (sel) {
                range.selectNodeContents(editorRef.current);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
                editorRef.current.focus();
            }
        }
    };

    return (
        <Wrapper>
            <EditableDiv
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                suppressContentEditableWarning
            />
        </Wrapper>
    );
}

const EditableDiv = styled.div`
    border: 1px solid #ccc;
    padding: 10px;
    width: 300px;
    height: 150px;
    overflow: auto;
    white-space: pre-wrap;

    .highlight {
        color: red;
    }

    .tag {
        color: blue;
        font-weight: bold;
    }

    .tag-input {
        position: absolute;
        display: inline-block;
    }
`;

const Wrapper = styled.div`
    .editable {
        font-family: sans-serif;
        margin-left: 10%;
        width: 75%;
        min-height: 100px;
        border: 1px dashed #aaa;
        padding: 5px;
        resize: none;
    }

    textarea.editable {
        font-family: monospace, monospace;
    }
`;
