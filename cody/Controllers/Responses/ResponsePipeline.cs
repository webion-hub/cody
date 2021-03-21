using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Responses
{
    internal class ResponsePipeline
    {
        private readonly ResponsePipelineChain _chain;

        public static ResponsePipeline Create() => new();
        private ResponsePipeline() 
        {
            _chain = new();
        }


        public ResponsePipeline IfNotNull<T>(ResponsePipelineCallback<T> valueGetter, IActionResult error)
        {
            _chain.Add(
                valueGetter: valueGetter, 
                returnErrorIf: res => res is null, 
                error: error
            );

            return this;
        }

        public ResponsePipeline IfTrue(ResponsePipelineCallback<bool> valueGetter, IActionResult error)
        {
            _chain.Add(
                valueGetter: valueGetter, 
                returnErrorIf: res => res, 
                error: error,
                addResult: false
            );

            return this;
        }

        public ResponsePipeline IfExists<T>(
            ResponsePipelineCallback<IfExistsPipelineResult<T>> valueGetter, 
            IActionResult error
        ) {
            _chain.Add(
                valueGetter: valueGetter, 
                returnErrorIf: res => !res.Exists, 
                resultSelector: res => res.Value,
                error: error
            );

            return this;
        }


        public async Task<IActionResult> Then(Func<ResponsePipelineResults, IActionResult> action)
        {
            var res = await _chain.ExecuteAsync();
            if (res.HasError)
                return res.Error;

            return action(_chain.Results);
        }

        public async Task<IActionResult> Then(Func<ResponsePipelineResults, Task<IActionResult>> action)
        {
            var res = await _chain.ExecuteAsync();
            if (res.HasError)
                return res.Error;

            return await action(_chain.Results);
        }
    }
}
