import { Test, compare, TestDiagnostic, TestExecutor } from "notus-qml-test";

@TestDiagnostic("anonymous-function-acceptable-size-rule")
export class TestAnonymousFunctionAcceptableSizeRule {

    @Test('Anonymous function acceptable size')
    testExample(executor: TestExecutor) {

        executor.addCase(
            {
                name: "Invalid anonymous function size",
                code: `
                    Window {
                        Component.onCompleted: function() {
                            console.log(1)
                            console.log(2)
                            console.log(3)
                            console.log(4)
                            console.log(5)
                        }
                    }
                `,
                report: function (data: any) {
                    compare(data.item, {
                        range: {
                            start: {
                                line: 1,
                                character: 34
                            },
                            end: {
                                line: 7,
                                character: 25
                            }
                        },
                        message: "Do not use anonymous functions longer than 4 lines",
                        severity: 2
                    });
                }
            }
        )

        executor.addCase(
            {
                name: "Valid anonymous functions size",
                code: `
                    Window {
                        Component.onCompleted: function() {
                            console.log(1)
                            console.log(2)
                            console.log(3)
                        }
                    }
                `,
            }
        )

        executor.run();
    }

}