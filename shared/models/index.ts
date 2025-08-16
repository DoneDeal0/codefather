export type GitUser = {
  name?: string;
};

export type CrewName = string;

export interface CodefatherRule {
  /** List of the files or folders that can only be modified by a given list of users */
  match: Array<RegExp | string>;
  /** List of users authorized to modify the list of files or folders. */
  goodfellas: GitUser[];
  /** List of authorized user crews (teams). The crews must be defined at the root of your config when used in CLI mode. */
  crews?: CrewName[];
  /** The message displayed if an unauthorized user tries to modify a protected file. If empty, a random message will be generated. */
  message?: string;
  /** If true, a warning will be issued and the script will not throw an error. False by default. */
  allowForgiveness?: boolean;
}

export interface CodefatherConfig {
  /** List of users authorized to modify any files in your repository. */
  caporegimes?: GitUser[];
  /** Rules that apply to protected files and folders */
  rules: CodefatherRule[];
  /** Options to refine the output */
  options?: {
    /** If true, the codefather face will appear in the terminal. Defaults to true. */
    showAscii?: boolean;
    /** If true, all the pull request committers will be checked against the authorized users. Only used in a GitHub Action context. Defaults to true. */
    vouchForAllCommitters?: boolean;
  };
  /** Options to auto assign reviewers on GitHub */
  codeReviews?: {
    /** If true, goodfellas responsible for modified files will be assigned on relevant pull requests, except the committers. Defaults to true. */
    autoAssignGoodfellas?: boolean;
    /** If true, caporegimes will be assigned on every pull request, except the committers. Defaults to false. */
    autoAssignCaporegimes?: boolean;
  };
  /** Group users in teams. Crew names and composition are flexible in CLI mode but should match your GitHub teams if used in a Github Action */
  crews?: Record<CrewName, GitUser[]>;
}

export interface ValidationResult {
  errors: string[];
  warnings: string[];
}

export enum MessageType {
  Success = "success",
  MultiSuccess = "multi-success",
  Error = "error",
  MultiErrors = "multi-errors",
  Warning = "warning",
  NoChanges = "no-changes",
  NotFound = "not-found",
  NoGitConfig = "no-gitconfig",
}

export type MessageOptions = {
  goodfellas?: CodefatherRule["goodfellas"];
  committers?: GitUser[];
};

export const colorsMap = {
  success: "\x1b[32m",
  error: "\x1b[31m",
  warning: "\x1b[33m",
  info: "\x1b[37m",
};
