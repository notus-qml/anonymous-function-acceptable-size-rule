import { DiagnosticReportContext, CodeAnalyzer, RegexRunnerMatch } from "notus-qml-core";
import { DiagnosticSeverity } from "notus-qml-types";

interface Params {
    nrLinesAcceptable?: number
}

module.exports = {
    handlers: {
        'anonymous-function-acceptable-size': {
            create: (context: DiagnosticReportContext) => ({
                _: (codeAnalyzer: CodeAnalyzer, { nrLinesAcceptable = 4 }: Params = {}) => {

                    // () => {}
                    // : {}
                    // function() {}
                    const identifyFunctionsRegex = /on\w+\s*:\s*(?:function\s*\([^)]*\)\s*|\([^)]*\)\s*=>\s*)?\{[\s\S]*?\}/g;

                    const matchs = codeAnalyzer.regexRunner.run(identifyFunctionsRegex);

                    matchs.forEach((regexRunner: RegexRunnerMatch) => {

                        const codeBlock = regexRunner.match[0];
                        const lineEnding = codeAnalyzer.lineEndings.lineEnding;
                        const lineRegex = new RegExp(lineEnding, 'g');
                        const lineCount = (codeBlock.match(lineRegex) || []).length;

                        if (lineCount <= nrLinesAcceptable) {
                            return;
                        }

                        context.report({
                            item: {
                                range: regexRunner.range,
                                message: `Do not use anonymous functions longer than ${nrLinesAcceptable} lines`,
                                severity: DiagnosticSeverity.Warning,
                            }
                        });
                    })
                }
            })
        }
    }
};
