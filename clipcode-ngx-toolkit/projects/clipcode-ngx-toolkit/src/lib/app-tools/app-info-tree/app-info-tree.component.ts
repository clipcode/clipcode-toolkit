import { Component, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { appInfoItems } from './app-info-items';

// https://stackoverflow.com/questions/19846078/how-to-read-from-chromes-console-in-javascript
// reading the browser's console
//https://developer.mozilla.org/en-US/docs/Web/API/console
// https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.console.html#dirxml

/*
<mat-icon class="type-icon" [attr.aria-label]="node.type + 'icon'">
      {{ node.type ==='file' ? 'description' : 'folder' }}
    </mat-icon>

 */
/** File node data with possible child nodes. */
export interface FileNode {
  name: string;
  key: string;
  type: string;
  children?: FileNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  key: string;
  type: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'clipcode-app-info-tree',
  templateUrl: './app-info-tree.component.html',
  styleUrls: ['./app-info-tree.component.css']
})
export class AppInfoTreeComponent implements AfterViewInit {

  @Output() contentSelected = new EventEmitter<string>();

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<FileNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<FileNode, FlatTreeNode>;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.dataSource.data = appInfoItems;
  }

  ngAfterViewInit(): void {
    // this.treeControl.expand(this.treeControl.dataNodes[0]);
  }

  /** Transform the data to something the tree can read. */
  transformer(node: FileNode, level: number): any {
    return {
      name: node.name,
      key: node.key,
      type: node.type,
      // tslint:disable-next-line: object-literal-shorthand
      level: level,
      expandable: !!node.children
    };
  }

  onContentSelected(selection: any): void {
    this.contentSelected.emit(selection);
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode): number {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: FileNode): FileNode[] | null | undefined {
    return node.children;
  }
}
