- Every Project (ie git repo) MUST have a UUIDv5
  - The UUIDv5 must be located in a .meta.json file at the project root, under the ".id" key
  - The UUID must be set in `git config` as the `project.id` key; (Ex: `git config --local project.id 1E883314-E3B4-4453-BFCF-098BE37CAF79`)

- Every document MUST have a UUIDv5
  - If the document is Markdown, the UUID must be set as the value of the 'id' key in the documents frontmatter.
  - If the document is not markdown, the UUID must be listed at the top of the file as a commented line, and prefixed by "id:" (ex: "// id:1E883314-E3B4-4453-BFCF-098BE37CAF79")

## POSIX-Compliant Alternative to `uuidgen`

> Need to make a git-hook or similar to distribute

```bash
# UUIDv4 using /dev/urandom (POSIX-ish, widely available)
generate_uuid() {
    local N B T
    for (( N=0; N < 16; ++N )); do
        B=$(( RANDOM%256 ))
        if (( N == 6 )); then
            printf '4%x' $(( B%16 ))
        elif (( N == 8 )); then
            local T=$(( B%4 ))
            printf '%x%x' $(( T+8 )) $(( B%16 ))
        else
            printf '%02x' $B
        fi
        if (( N == 3 || N == 5 || N == 7 || N == 9 )); then
            printf '-'
        fi
    done
    echo
}

```
