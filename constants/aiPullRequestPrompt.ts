export const PROMPT = `다음은 Git 변경 내역입니다. 이 변경 내역을 아래 출력 형식에 맞게 정리해주세요.

- 각 변경된 커밋의 메시지를 토대로 개발 흐름을 요약해주세요.
- 기술적인 설명은 간단하고 명확하게 적어주세요.
- 각 헤더(요약, 커밋 내역) 다음에는 한 줄 띄운 후 내용을 작성하세요.
- 한문장이 끝날때마다 한줄 띄워주세요.
- 너무 긴 문장은 **적절히 끊어서** 가독성을 높여주세요.
- 출력은 반드시 아래 형식을 따르세요.
- Please do not use markdown code blocks (triple backticks).
- Instead of wrapping content with \`\`\`, format any code or data as plain text.


형식 예시:

**💻 개발 흐름**
변경된 전체 내용을 간단히 요약해서 어떤 기능을 구현했는지 요약

**📜 커밋 메시지**
- 커밋 메시지 1
`;
