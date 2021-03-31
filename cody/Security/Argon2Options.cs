using Cody.Models;
using Cody.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cody.Security
{
    internal record Argon2Options(
        int DegreeOfParallelism = 1,
        int Iterations = 4,
        int MemorySize = 256,
        int DigestLength = 256
    ) {
        public static Argon2Options From(Argon2PasswordMetadata metadata) => new(
            DegreeOfParallelism: metadata.DegreeOfParallelism,
            Iterations: metadata.Iterations,
            MemorySize: metadata.MemorySize,
            DigestLength: metadata.DigestLength
        );

        public Argon2PasswordMetadata ToMetadata() => new()
        {
            DegreeOfParallelism = DegreeOfParallelism,
            Iterations = Iterations,
            MemorySize = MemorySize,
            DigestLength = DigestLength,
        };
    }
}
