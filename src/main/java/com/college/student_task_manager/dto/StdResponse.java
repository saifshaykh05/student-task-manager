package com.college.student_task_manager.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter@Builder@AllArgsConstructor
public class StdResponse<T> {
    private boolean status;
    private String message;
    private T body;

}
