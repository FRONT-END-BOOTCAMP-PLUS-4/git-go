import { CommitType } from "@/types/github/CommitType";

export const DEMO_COMMIT: CommitType = {
    sha: "1234567890abcdef",
    authorDate: "2025-06-20T09:12:34Z",
    authorName: "Yoonstar",
    message: "Feat: useState를 활용한 카운트 연습",
    changeDetail: [
        {
            additions: 8,
            deletions: 2,
            changes: 10,
            filename: "src/components/Counter.tsx",
            patch: `
@@ -1,6 +1,12 @@
-import React from "react";
+import React, { useState } from "react";
 
-const Counter = () => {
-  return <div>0</div>;
-};
+const Counter = () => {
+  const [count, setCount] = useState(0);
+  return (
+    <div>
+      <button onClick={() => setCount(count + 1)}>+</button>
+      <span>{count}</span>
+      <button onClick={() => setCount(count - 1)}>-</button>
+    </div>
+  );
+};
 
 export default Counter;
      `,
            raw_url:
                "https://github.com/yourrepo/raw/1234567890abcdef/src/components/Counter.tsx",
            status: "modified",
        },
        {
            additions: 2,
            deletions: 0,
            changes: 2,
            filename: "src/App.tsx",
            patch: `
@@ -7,6 +7,8 @@
 import Counter from "./components/Counter";
 
 function App() {
   return (
     <div>
       <h1>My App</h1>
+      <Counter />
     </div>
   );
 }
      `,
            raw_url:
                "https://github.com/yourrepo/raw/1234567890abcdef/src/App.tsx",
            status: "modified",
        },
    ],
    filesChanged: [
        {
            name: "src",
            type: "directory",
            children: [
                {
                    name: "components",
                    type: "directory",
                    children: [
                        {
                            name: "Counter.tsx",
                            type: "file",
                        },
                    ],
                },
                {
                    name: "App.tsx",
                    type: "file",
                },
            ],
        },
    ],
};
