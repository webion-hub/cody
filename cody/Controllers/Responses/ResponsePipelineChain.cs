using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Controllers.Responses
{
    internal class ResponsePipelineChain
    {
        public ResponsePipelineResults Results { get; init; }
        private Task<IntermediateResult> _root;


        public ResponsePipelineChain()
        {
            _root = Task.FromResult(IntermediateResult.Ok);
            Results = new();
        }


        public async Task<IntermediateResult> ExecuteAsync() => await _root;


        public void Add<T>(
            ResponsePipelineCallback<T> valueGetter,
            Predicate<T> returnErrorIf,
            IActionResult error,
            bool addResult = true
        ) {
            Add(valueGetter, returnErrorIf, res => res, error, addResult);
        }

        public void Add<T>(
            ResponsePipelineCallback<T> valueGetter,
            Predicate<T> returnErrorIf,
            Func<T, object> resultSelector,
            IActionResult error,
            bool addResult = true
        ) {
            _root = _root.ContinueWith(prev =>
            {
                if (prev.Result.HasError)
                    return prev.Result;

                var result = valueGetter.Callback(Results);
                if (returnErrorIf(result))
                    return new IntermediateResult(true, error);

                if (addResult)
                    Results.Add(resultSelector(result));

                return IntermediateResult.Ok;
            });
        }
    }
}
