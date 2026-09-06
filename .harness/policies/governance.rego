package pipeline

deny[msg] if {
    input.pipeline.stages[_].spec.infrastructure.environment.name == "Production"
    
    approval_stages := [s | s := input.pipeline.stages[_]; s.type == "Approval"]
    
    count(approval_stages) == 0
    
    msg := "POLICY VIOLATION: Production deployments require an Approval stage"
}

deny[msg] if {
    approval_stages := [s | s := input.pipeline.stages[_]; s.type == "Approval"]
    count(approval_stages) > 0
    
    approval := approval_stages[0]
    not approval.template.templateRef == "security_approval_step"
    
    msg := "POLICY VIOLATION: Approval stage must use 'security_approval_step' template"
}
