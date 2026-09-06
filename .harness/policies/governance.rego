package pipeline

deny[msg] {
    has_deployment
    not has_approval
    msg := "Pipeline with Deployment stages must include an Approval stage"
}

has_deployment {
    input.pipeline.stages[_].stage.type == "Deployment"
}

has_approval {
    input.pipeline.stages[_].stage.type == "Approval"
}