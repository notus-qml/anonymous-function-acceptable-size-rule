import { Test, compare, TestDiagnosticRule, TestExecutor } from "notus-qml-test";

@TestDiagnosticRule("anonymous-function-acceptable-size-rule")
export class TestAnonymousFunctionAcceptableSizeRule {

    @Test('Anonymous function acceptable size')
    testExample(executor: TestExecutor) {

        executor.addCase(
            {
                name: "",
                code: ``,
                report: function (data: any) {
                    compare(data.item, {
                        message: "",
                        severity: 0,
                        suggestions: [
                            {
                                title: "",
                                items: [
                                    {
                                        "newText": ""
                                    }
                                ]
                            }
                        ]
                    });
                }
            }
        )

        executor.run();
    }

}