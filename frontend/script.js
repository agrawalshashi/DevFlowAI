 id="u6g8qn"
document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ELEMENTS
    // ==========================================

    const ideaInput =
        document.getElementById("idea");

    const analyzeButton =
        document.getElementById("analyze");

    const result =
        document.getElementById("result");

    const loading =
        document.getElementById("loading");

    const loadingText =
        document.getElementById("loadingText");

    const charCount =
        document.getElementById("charCount");

    const copyButton =
        document.getElementById("copyBlueprint");

    const downloadButton =
        document.getElementById("downloadBlueprint");

    const pipelineStatus =
        document.getElementById("pipelineStatus");

    const workflowItems =
        document.querySelectorAll(
            ".workflow-item"
        );

    const exampleButtons =
        document.querySelectorAll(
            ".example"
        );

    const tabs =
        document.querySelectorAll(".tab");

    const traceAgents =
        document.querySelectorAll(
            ".trace-agent"
        );


    // ==========================================
    // STATE
    // ==========================================

    let blueprint = null;

    let currentStage = "manager";


    // ==========================================
    // STAGE INFORMATION
    // ==========================================

    const stageInfo = {

        manager: {
            number: "01",
            title: "PROJECT MANAGER",
            trace: 0
        },

        requirements: {
            number: "02",
            title: "REQUIREMENTS",
            trace: 1
        },

        research: {
            number: "03",
            title: "RESEARCH",
            trace: 2
        },

        architecture: {
            number: "04",
            title: "ARCHITECTURE",
            trace: 3
        },

        planner: {
            number: "05",
            title: "DEVELOPMENT PLAN",
            trace: 4
        },

        review: {
            number: "06",
            title: "PROJECT REVIEW",
            trace: 5
        }

    };


    // ==========================================
    // CHARACTER COUNTER
    // ==========================================

    ideaInput.addEventListener(
        "input",
        function () {

            const count =
                ideaInput.value.length;

            charCount.textContent =
                count +
                " character" +
                (count === 1 ? "" : "s");

        }
    );


    // ==========================================
    // QUICK START BUTTONS
    // ==========================================

    exampleButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const example =
                        button.getAttribute(
                            "data-example"
                        );

                    if (!example) {
                        return;
                    }

                    ideaInput.value =
                        example;

                    ideaInput.dispatchEvent(
                        new Event("input")
                    );

                    ideaInput.focus();

                }
            );

        }
    );


    // ==========================================
    // SIDEBAR WORKFLOW
    // ==========================================

    workflowItems.forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    const stage =
                        item.getAttribute(
                            "data-stage"
                        );

                    if (!stage) {
                        return;
                    }

                    selectStage(stage);

                }
            );

        }
    );


    // ==========================================
    // RESULT TABS
    // ==========================================

    tabs.forEach(
        function (tab) {

            tab.addEventListener(
                "click",
                function () {

                    const stage =
                        tab.getAttribute(
                            "data-tab"
                        );

                    if (!stage) {
                        return;
                    }

                    selectStage(stage);

                }
            );

        }
    );


    // ==========================================
    // SELECT STAGE
    // ==========================================

    function selectStage(stage) {

        if (!stageInfo[stage]) {
            return;
        }

        currentStage =
            stage;


        // Sidebar active state

        workflowItems.forEach(
            function (item) {

                const itemStage =
                    item.getAttribute(
                        "data-stage"
                    );

                item.classList.toggle(
                    "active",
                    itemStage === stage
                );

            }
        );


        // Tab active state

        tabs.forEach(
            function (tab) {

                const tabStage =
                    tab.getAttribute(
                        "data-tab"
                    );

                tab.classList.toggle(
                    "active",
                    tabStage === stage
                );

            }
        );


        // Trace active state

        updateTrace(stage);


        // Show content

        if (blueprint) {

            showStage(stage);

        }
        else {

            showWaitingMessage(stage);

        }

    }


    // ==========================================
    // TRACE
    // ==========================================

    function updateTrace(stage) {

        const info =
            stageInfo[stage];

        if (!info) {
            return;
        }


        traceAgents.forEach(
            function (agent, index) {

                agent.classList.toggle(
                    "active",
                    index === info.trace
                );

            }
        );

    }


    // ==========================================
    // RUN DEVFLOW
    // ==========================================

    analyzeButton.addEventListener(
        "click",
        async function () {

            const idea =
                ideaInput.value.trim();


            if (!idea) {

                alert(
                    "Please enter a project idea first."
                );

                ideaInput.focus();

                return;
            }


            // Button state

            analyzeButton.disabled =
                true;


            const buttonText =
                analyzeButton.querySelector(
                    "span"
                );


            if (buttonText) {

                buttonText.textContent =
                    "RUNNING...";

            }


            // Loading

            loading.style.display =
                "flex";


            pipelineStatus.textContent =
                "EXECUTING";


            loadingText.textContent =
                "DevFlow is analyzing your project idea...";


            // Temporary result

            result.innerHTML = `
                <div class="empty-state">

                    <div class="empty-icon">
                        ...
                    </div>

                    <h3>
                        Generating Blueprint
                    </h3>

                    <p>
                        DevFlow agents are working...
                    </p>

                </div>
            `;


            try {

                const response =
                    await fetch(
                        "/api/project/analyze",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify({
                                    idea: idea
                                })
                        }
                    );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.error ||
                        "Server returned an error."
                    );

                }


                if (
                    !data.blueprint ||
                    typeof data.blueprint !==
                    "object"
                ) {

                    throw new Error(
                        "Blueprint was not returned by the server."
                    );

                }


                // Save complete response

                blueprint =
                    data.blueprint;


                pipelineStatus.textContent =
                    "COMPLETE";


                loadingText.textContent =
                    "Blueprint generated successfully.";


                // Show selected stage

                showStage(
                    currentStage
                );


            }
            catch (error) {

                console.error(
                    "DevFlow error:",
                    error
                );


                pipelineStatus.textContent =
                    "ERROR";


                loadingText.textContent =
                    "DevFlow request failed.";


                result.innerHTML = `
                    <div class="empty-state">

                        <div class="empty-icon">
                            !
                        </div>

                        <h3>
                            Something went wrong
                        </h3>

                        <p>
                            ${escapeHTML(
                                error.message
                            )}
                        </p>

                    </div>
                `;

            }
            finally {

                analyzeButton.disabled =
                    false;


                if (buttonText) {

                    buttonText.textContent =
                        "RUN DEVFLOW";

                }

            }

        }
    );


    // ==========================================
    // SHOW STAGE
    // ==========================================

    function showStage(stage) {

        const info =
            stageInfo[stage];


        if (!info) {
            return;
        }


        let content =
            blueprint
                ? blueprint[stage]
                : null;


        // Research may be intentionally skipped

        if (
            stage === "research" &&
            (
                !content ||
                content === ""
            )
        ) {

            content =
                "### Research Stage\n\n" +
                "Research stage skipped in " +
                "Fast MVP Mode.\n\n" +
                "This stage can be connected " +
                "to a dedicated research agent " +
                "in a future version.";

        }


        if (
            content === null ||
            content === undefined ||
            content === ""
        ) {

            result.innerHTML = `
                <div class="empty-state">

                    <div class="empty-icon">
                        ?
                    </div>

                    <h3>
                        No output available
                    </h3>

                    <p>
                        This stage did not return
                        any content.
                    </p>

                </div>
            `;

            return;
        }


        result.innerHTML = `

            <article class="blueprint-card">

                <div class="card-header">

                    <span class="num">
                        ${info.number}
                    </span>

                    <strong>
                        ${info.title}
                    </strong>

                </div>


                <div class="card-body">

                    ${renderMarkdown(content)}

                </div>

            </article>

        `;


        // Scroll result into view on mobile

        if (
            window.innerWidth < 800
        ) {

            result.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    // ==========================================
    // WAITING MESSAGE
    // ==========================================

    function showWaitingMessage(stage) {

        const info =
            stageInfo[stage];


        if (!info) {
            return;
        }


        result.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    +
                </div>

                <h3>
                    ${info.title}
                </h3>

                <p>
                    Generate a blueprint first
                    to view this stage.
                </p>

            </div>

        `;

    }


    // ==========================================
    // MARKDOWN
    // ==========================================

    function renderMarkdown(text) {

        const value =
            String(text);


        if (
            typeof marked !== "undefined" &&
            typeof marked.parse === "function"
        ) {

            return marked.parse(value);

        }


        return escapeHTML(
            value
        ).replace(
            /\n/g,
            "<br>"
        );

    }


    // ==========================================
    // COPY
    // ==========================================

    copyButton.addEventListener(
        "click",
        async function () {

            if (!blueprint) {

                alert(
                    "Generate a blueprint first."
                );

                return;
            }


            let text =
                blueprint[currentStage];


            if (
                !text &&
                currentStage === "research"
            ) {

                text =
                    "Research stage skipped in Fast MVP Mode.";

            }


            if (!text) {

                alert(
                    "No output available for this stage."
                );

                return;
            }


            try {

                await navigator.clipboard.writeText(
                    String(text)
                );


                copyButton.textContent =
                    "COPIED ✓";


                setTimeout(
                    function () {

                        copyButton.textContent =
                            "COPY";

                    },
                    1500
                );

            }
            catch (error) {

                console.error(error);

                alert(
                    "Could not copy the output."
                );

            }

        }
    );


    // ==========================================
    // EXPORT MARKDOWN
    // ==========================================

    downloadButton.addEventListener(
        "click",
        function () {

            if (!blueprint) {

                alert(
                    "Generate a blueprint first."
                );

                return;
            }


            let text =
                blueprint[currentStage];


            if (
                !text &&
                currentStage === "research"
            ) {

                text =
                    "Research stage skipped in Fast MVP Mode.";

            }


            if (!text) {

                alert(
                    "No output available for this stage."
                );

                return;
            }


            const blob =
                new Blob(
                    [String(text)],
                    {
                        type:
                            "text/markdown;charset=utf-8"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");


            link.href =
                url;


            link.download =
                "devflow-" +
                currentStage +
                ".md";


            document.body.appendChild(
                link
            );


            link.click();


            document.body.removeChild(
                link
            );


            URL.revokeObjectURL(
                url
            );


            downloadButton.textContent =
                "EXPORTED ✓";


            setTimeout(
                function () {

                    downloadButton.textContent =
                        "EXPORT .MD";

                },
                1500
            );

        }
    );


    // ==========================================
    // ESCAPE HTML
    // ==========================================

    function escapeHTML(text) {

        const div =
            document.createElement("div");


        div.textContent =
            String(text);


        return div.innerHTML;

    }


    // ==========================================
    // INITIAL STATE
    // ==========================================

    selectStage("manager");

});
